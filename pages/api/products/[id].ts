import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
  product?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await getServerSession(req, res, authOptions);
  
  // Connect to the database
  await dbConnect();

  // Get product ID from URL
  const { id } = req.query;
  
  // Check ID validity
  if (!id || !mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid Product ID' 
    });
  }

  // GET - fetch product information
  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id)
        .populate('seller', 'name email university');
      
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: 'Product not found' 
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        product 
      });
    } catch (error: any) {
      console.error(`Error fetching product ${id}:`, error);
      return res.status(500).json({ 
        success: false, 
        message: `Server error: ${error.message}` 
      });
    }
  }
  
  // PUT - update product
  else if (req.method === 'PUT') {
    // Check authorization
    if (!session || !session.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authorization required' 
      });
    }

    try {
      // Get the existing product
      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: 'Product not found' 
        });
      }
      
      // Check permissions (only owner can modify)
      if (product.seller.toString() !== session.user.id) {
        return res.status(403).json({ 
          success: false, 
          message: 'You do not have permission to edit this product' 
        });
      }
      
      // Update product data
      const { 
        title, 
        description, 
        price, 
        category, 
        condition, 
        images, 
        university,
        course,
        isAvailable
      } = req.body;

      // Create an update object
      const updateData: any = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (price) updateData.price = price;
      if (category) updateData.category = category;
      if (condition) updateData.condition = condition;
      if (images) updateData.images = images;
      if (university) updateData.university = university;
      if (course !== undefined) updateData.course = course;
      if (isAvailable !== undefined) updateData.isAvailable = isAvailable;

      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).populate('seller', 'name email university');

      return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct
      });
    } catch (error: any) {
      console.error(`Error updating product ${id}:`, error);
      return res.status(500).json({ 
        success: false, 
        message: `Server error: ${error.message}` 
      });
    }
  }
  
  // DELETE - delete product
  else if (req.method === 'DELETE') {
    // Check authorization
    if (!session || !session.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authorization required' 
      });
    }

    try {
      // Get the existing product
      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: 'Product not found' 
        });
      }
      
      // Check permissions (only owner can delete)
      if (product.seller.toString() !== session.user.id) {
        return res.status(403).json({ 
          success: false, 
          message: 'You do not have permission to delete this product' 
        });
      }
      
      // Delete the product
      await Product.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error: any) {
      console.error(`Error deleting product ${id}:`, error);
      return res.status(500).json({ 
        success: false, 
        message: `Server error: ${error.message}` 
      });
    }
  }
  
  // Handle unsupported methods
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
  }
} 