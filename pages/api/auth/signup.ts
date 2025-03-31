import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { hash } from 'bcryptjs';

// File for storing users (in a real application this would be a database)
const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

// Ensure that the data directory exists
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Ensure that the users.json file exists and contains valid JSON
const ensureUsersFileExists = () => {
  ensureDirectoryExists(path.join(process.cwd(), 'data'));
  
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
  } else {
    try {
      JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    } catch (error) {
      fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only process POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get data from the request
    const { name, email, password, university, role } = req.body;

    // Basic validation
    if (!name || !email || !password || !university) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Ensure the users.json file exists
    ensureUsersFileExists();

    // Read existing users
    const usersJson = fs.readFileSync(usersFilePath, 'utf8');
    const users = JSON.parse(usersJson);

    // Check if a user with this email already exists
    if (users.some((user: any) => user.email === email)) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      university,
      role: role || 'student', // Default role is student
      createdAt: new Date().toISOString(),
    };

    // Add the user to the array
    users.push(newUser);

    // Write the updated users array
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // Return success without the password
    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Error creating user' });
  }
} 