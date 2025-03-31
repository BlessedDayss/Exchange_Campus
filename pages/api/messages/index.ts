import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Message from '../../../models/Message';
import User from '../../../models/User';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
  messages?: any[];
  conversation?: any;
  total?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await getServerSession(req, res, authOptions);
  
  // Check authorization
  if (!session || !session.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authorization required' 
    });
  }

  // Connect to the database
  await dbConnect();
  
  // GET - fetch list of messages for a conversation
  if (req.method === 'GET') {
    try {
      const { 
        userId, // ID of the user with whom the conversation is held
        page = '1',
        limit = '20',
      } = req.query;
      
      // Check if the other user ID is provided and valid
      if (!userId || !mongoose.Types.ObjectId.isValid(userId as string)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide a valid User ID' 
        });
      }
      
      // Check if the other user exists
      const otherUser = await User.findById(userId);
      if (!otherUser) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }
      
      // Build the query to fetch messages between the two users
      const filter = {
        $or: [
          { sender: session.user.id, receiver: userId },
          { sender: userId, receiver: session.user.id }
        ]
      };
      
      // Get the total count of messages
      const total = await Message.countDocuments(filter);
      
      // Prepare pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;
      
      // Fetch messages sorted by date (oldest first)
      const messages = await Message.find(filter)
        .populate('sender', 'name email')
        .populate('receiver', 'name email')
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limitNum);
      
      // Mark all unread messages from the other user as read
      await Message.updateMany(
        { receiver: session.user.id, sender: userId, isRead: false },
        { isRead: true }
      );
      
      return res.status(200).json({ 
        success: true, 
        messages,
        total
      });
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ 
        success: false, 
        message: `Server error: ${error.message}` 
      });
    }
  }
  
  // POST - send a new message
  else if (req.method === 'POST') {
    try {
      const { receiverId, content } = req.body;
      
      // Check required fields
      if (!receiverId || !content) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide recipient ID and message content' 
        });
      }
      
      // Check if the recipient ID is valid
      if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid Recipient ID' 
        });
      }
      
      // Check if the recipient exists
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return res.status(404).json({ 
          success: false, 
          message: 'Recipient not found' 
        });
      }
      
      // Create a new message
      const newMessage = new Message({
        sender: session.user.id,
        receiver: receiverId,
        content,
        isRead: false
      });
      
      // Save the message
      await newMessage.save();
      
      // Return the created message with sender info
      const message = await Message.findById(newMessage._id)
        .populate('sender', 'name email')
        .populate('receiver', 'name email');
      
      return res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        messages: [message]
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      return res.status(500).json({ 
        success: false, 
        message: `Server error: ${error.message}` 
      });
    }
  }
  
  // Handle unsupported methods
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
  }
} 