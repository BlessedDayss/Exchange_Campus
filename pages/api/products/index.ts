import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';

type ResponseData = {
  success: boolean;
  message?: string;
  products?: any[];
  product?: any;
  total?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await getServerSession(req, res, authOptions);
  
  // Подключаемся к базе данных
  await dbConnect();

  // GET - получение списка товаров с фильтрацией
  if (req.method === 'GET') {
    try {
      const { 
        university, 
        category, 
        course, 
        query,
        page = '1',
        limit = '10',
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Создаем фильтр для поиска
      const filter: any = { isAvailable: true };
      
      if (university) filter.university = university;
      if (category) filter.category = category;
      if (course) filter.course = course;
      
      // Поиск по названию или описанию
      if (query) {
        filter.$or = [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ];
      }

      // Получаем общее количество записей
      const total = await Product.countDocuments(filter);
      
      // Подготавливаем пагинацию
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;
      
      // Получаем данные с сортировкой
      const sortOption: any = {};
      sortOption[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

      const products = await Product.find(filter)
        .populate('seller', 'name email university')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum);
      
      return res.status(200).json({ 
        success: true, 
        products,
        total
      });
    } catch (error: any) {
      console.error('Ошибка при получении списка товаров:', error);
      return res.status(500).json({ 
        success: false, 
        message: `Ошибка сервера: ${error.message}` 
      });
    }
  }
  
  // POST - добавление нового товара
  else if (req.method === 'POST') {
    // Проверяем авторизацию
    if (!session || !session.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Необходима авторизация' 
      });
    }

    try {
      const { 
        title, 
        description, 
        price, 
        category, 
        condition, 
        images, 
        university,
        course 
      } = req.body;

      // Проверяем обязательные поля
      if (!title || !description || !price || !category || !condition) {
        return res.status(400).json({ 
          success: false, 
          message: 'Заполните все обязательные поля' 
        });
      }

      // Создаем новый товар
      const product = new Product({
        title,
        description,
        price,
        category,
        condition,
        images: images || [],
        university: university || session.user.university,
        course,
        seller: session.user.id
      });

      // Сохраняем товар
      await product.save();

      return res.status(201).json({
        success: true,
        message: 'Товар успешно добавлен',
        product
      });
    } catch (error: any) {
      console.error('Ошибка при добавлении товара:', error);
      return res.status(500).json({ 
        success: false, 
        message: `Ошибка сервера: ${error.message}` 
      });
    }
  }
  
  // Обработка неподдерживаемых методов
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ 
      success: false, 
      message: `Метод ${req.method} не поддерживается` 
    });
  }
} 