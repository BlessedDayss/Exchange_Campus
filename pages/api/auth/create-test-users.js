import { users } from '../../../pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Недоступно в производственной среде' });
  }

  try {
    // Обновляем стандартных пользователей
    if (users.length > 0) {
      // Сбрасываем пароли до стандартных значений
      users.forEach(user => {
        user.password = 'password123';
      });
      
      // Убеждаемся, что есть два стандартных пользователя
      if (users.length < 2) {
        if (!users.find(u => u.email === 'admin@example.com')) {
          users.push({
            id: String(Date.now()),
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
          });
        }
        
        if (!users.find(u => u.email === 'test@example.com')) {
          users.push({
            id: String(Date.now() + 1),
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
          });
        }
      }
    }

    // Отправляем успешный ответ
    return res.status(200).json({
      message: 'Тестовые пользователи обновлены',
      users: users,
      testPassword: 'password123',
    });
  } catch (error) {
    console.error('Ошибка создания тестовых пользователей:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
} 