import { users } from '../../../pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Недоступно в производственной среде' });
  }

  try {
    // Возвращаем список пользователей, исключая хеширование паролей в ответе
    return res.status(200).json({
      message: 'Список пользователей',
      users: users,
    });
  } catch (error) {
    console.error('Ошибка получения пользователей:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
} 