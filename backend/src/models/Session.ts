import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  businessId: mongoose.Types.ObjectId;
  sessionId: string;
  visitorId?: string;
  screen: {
    width: number;
    height: number;
  };
  events: {
    type: string;
    data: any;
    timestamp: Date;
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  sessionId: { type: String, required: true, index: true },
  visitorId: { type: String },
  screen: {
    width: Number,
    height: Number
  },
  events: [{
    type: String,
    data: Schema.Types.Mixed,
    timestamp: Date,
    url: String
  }]
}, { timestamps: true });

export default mongoose.model<ISession>('Session', SessionSchema);
