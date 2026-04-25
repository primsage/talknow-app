import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  businessId: mongoose.Types.ObjectId;
  visitorName: string;
  visitorEmail: string;
  visitorPhone?: string;
  startTime: Date;
  endTime: Date;
  type: 'zoom' | 'google_meet' | 'phone';
  meetingLink?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  visitorName: { type: String, required: true },
  visitorEmail: { type: String, required: true },
  visitorPhone: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  type: { type: String, enum: ['zoom', 'google_meet', 'phone'], required: true },
  meetingLink: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
