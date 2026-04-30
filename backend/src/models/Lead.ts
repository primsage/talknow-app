import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  businessId: mongoose.Types.ObjectId;
  type: 'callback' | 'offline_enquiry';
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  preferredTime?: string;
  visitorInfo?: any;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  type: { type: String, enum: ['callback', 'offline_enquiry'], required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
  preferredTime: { type: String },
  visitorInfo: { type: Object },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

LeadSchema.index({ businessId: 1, createdAt: -1 });

export default mongoose.model<ILead>('Lead', LeadSchema);
