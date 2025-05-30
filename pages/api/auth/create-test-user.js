import bcrypt from 'bcryptjs';
import { addUser, findUserByEmail } from '../../../lib/users';

export default async function handler(req, res) {
  // Development only!
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not available in production' });
  }

  try {
    const testEmail = 'test@example.com';
    const plainPassword = 'password123';
    
    // Check if test user already exists
    if (findUserByEmail(testEmail)) {
      return res.status(200).json({ 
        message: 'Test user already exists',
        user: {
          email: testEmail,
          password: plainPassword
        }
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // Create test user
    const testUser = {
      id: Date.now().toString(),
      name: 'Test User',
      email: testEmail,
      password: hashedPassword
    };
    
    addUser(testUser);
    
    return res.status(201).json({ 
      message: 'Test user created successfully',
      user: {
        email: testEmail,
        password: plainPassword
      }
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 