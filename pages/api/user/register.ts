import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

type ResponseData = {
  success: boolean;
  message: string;
  user?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // Connect to the database
    await dbConnect();

    const { name, email, password, university } = req.body;

    // Check if all required fields are filled
    if (!name || !email || !password || !university) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      university,
      // Automatically verify users with university email addresses
      isVerified: email.endsWith('.edu') || email.includes('university') || email.includes('uni')
    });

    // Save the user
    await user.save();

    // Return a successful response
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        isVerified: user.isVerified
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: `Server error: ${error.message || 'Something went wrong'}` 
    });
  }
} 