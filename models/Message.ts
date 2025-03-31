import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IMessage extends Document {
  sender: IUser['_id'];
  receiver: IUser['_id'];
  content: string;
  isRead: boolean;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    sender: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    receiver: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema); 