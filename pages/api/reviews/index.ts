import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Review from '../../../models/Review';
import User from '../../../models/User';
import Product from '../../../models/Product';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
  reviews?: any[];
  review?: any;
  total?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await getServerSession(req, res, authOptions);
  
  // Connect to the database
  await dbConnect();

  // GET - fetch list of reviews
  if (req.method === 'GET') {
    try {
      const { 
        userId, // ID of the user for whom reviews are needed
        page = '1',
        limit = '10'
      } = req.query;
      
      // Check validity of user ID
      if (userId && !mongoose.Types.ObjectId.isValid(userId as string)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid User ID' 
        });
      }
      
      // Build the query for fetching reviews
      const filter: any = {};
      
      // If user ID is provided, find reviews for that user
      if (userId) {
        filter.recipient = userId;
      }
      
      // Get the total count of reviews
      const total = await Review.countDocuments(filter);
      
      // Prepare pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;
      
      // Fetch reviews with sorting by date (newest first)
      const reviews = await Review.find(filter)
        .populate('reviewer', 'name email university')
        .populate('recipient', 'name email university')
        .populate('product', 'title price images')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);
      
      return res.status(200).json({ 
        success: true, 
        reviews,
        total
      });
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ 
        success: false, 
        message: `Server error: ${error.message}` 
      });
    }
  }
  
  // POST - add a new review
  else if (req.method === 'POST') {
    // Check authorization
    if (!session || !session.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authorization required' 
      });
    }

    try {
      const { 
        recipientId, 
        productId, 
        rating, 
        comment 
      } = req.body;
      
      // Check required fields
      if (!recipientId || !rating || !comment) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please fill in all required fields' 
        });
      }
      
      // Check validity of recipient ID
      if (!mongoose.Types.ObjectId.isValid(recipientId)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid Recipient ID' 
        });
      }
      
      // Check validity of product ID if provided
      if (productId && !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid Product ID' 
        });
      }
      
      // Check if recipient user exists
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return res.status(404).json({ 
          success: false, 
          message: 'Recipient user not found' 
        });
      }
      
      // Check if product exists if provided
      if (productId) {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ 
            success: false, 
            message: 'Product not found' 
          });
        }
      }
      
      // Check if user is trying to review themselves
      if (session.user.id === recipientId) {
        return res.status(400).json({ 
          success: false, 
          message: 'Cannot review yourself' 
        });
      }
      
      // Create a new review
      const review = new Review({
        reviewer: session.user.id,
        recipient: recipientId,
        product: productId || null,
        rating: Math.min(Math.max(rating, 1), 5), // Clamp rating between 1 and 5
        comment,
      });
      
      // Save the review
      await review.save();
      
      // Return the created review with populated user and product info
      const populatedReview = await Review.findById(review._id)
        .populate('reviewer', 'name email university')
        .populate('recipient', 'name email university')
        .populate('product', 'title price images');
      
      return res.status(201).json({
        success: true,
        message: 'Review added successfully',
        review: populatedReview
      });
    } catch (error: any) {
      console.error('Error adding review:', error);
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