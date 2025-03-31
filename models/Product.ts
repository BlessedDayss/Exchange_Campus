import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'acceptable';
  images: string[];
  university: string;
  course?: string;
  seller: IUser['_id'];
  createdAt: Date;
  isAvailable: boolean;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    condition: { 
      type: String, 
      enum: ['new', 'like-new', 'good', 'acceptable'],
      required: true 
    },
    images: [{ type: String }],
    university: { type: String, required: true },
    course: { type: String },
    seller: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema); 