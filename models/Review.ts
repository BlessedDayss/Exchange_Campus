import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IProduct } from './Product';

export interface IReview extends Document {
  reviewer: IUser['_id'];
  recipient: IUser['_id'];
  product?: IProduct['_id'];
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    reviewer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    recipient: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    product: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product'
    },
    rating: { 
      type: Number, 
      required: true,
      min: 1,
      max: 5 
    },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema); 