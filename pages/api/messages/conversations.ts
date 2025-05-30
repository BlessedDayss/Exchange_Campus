import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Message from '../../../models/Message';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
  conversations?: any[];
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
  
  // GET - fetch list of conversations
  if (req.method === 'GET') {
    try {
      // Find all unique conversations for the user
      // Group by the other participant and find the last message in each conversation
      const userId = new mongoose.Types.ObjectId(session.user.id);
      
      const conversations = await Message.aggregate([
        {
          $match: {
            $or: [
              { sender: userId },
              { receiver: userId }
            ]
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$sender", userId] },
                "$receiver",
                "$sender"
              ]
            },
            lastMessage: { $first: "$$ROOT" },
            unreadCount: {
              $sum: {
                $cond: [
                  { $and: [
                    { $eq: ["$receiver", userId] },
                    { $eq: ["$isRead", false] }
                  ]},
                  1,
                  0
                ]
              }
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: "$user"
        },
        {
          $project: {
            _id: 1,
            user: {
              _id: 1,
              name: 1,
              email: 1,
              university: 1,
              profileImage: 1
            },
            lastMessage: 1,
            unreadCount: 1
          }
        },
        {
          $sort: { "lastMessage.createdAt": -1 }
        }
      ]);
      
      return res.status(200).json({ 
        success: true, 
        conversations
      });
    } catch (error: any) {
      console.error('Error fetching conversations:', error);
      return res.status(500).json({ 
        success: false, 
        message: `Server error: ${error.message}` 
      });
    }
  }
  
  // Handle unsupported methods
  else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
  }
} 