import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  businessId: mongoose.Types.ObjectId;
  visitorId: string;
  sender: 'visitor' | 'agent';
  agentId?: mongoose.Types.ObjectId;
  text: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorInfo?: any;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  visitorId: { type: String, required: true },
  sender: { type: String, enum: ['visitor', 'agent'], required: true },
  agentId: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  visitorName: { type: String },
  visitorEmail: { type: String },
  visitorInfo: { type: Object },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>('Message', MessageSchema);
