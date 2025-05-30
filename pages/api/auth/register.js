import bcrypt from 'bcryptjs';
import { users, findUserByEmail, addUser } from '../../../lib/users';

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user with this email already exists
    if (findUserByEmail(email)) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
    };

    // Add user (in real app - to database)
    addUser(newUser);

    // Send success response
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 