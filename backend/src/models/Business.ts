import mongoose, { Schema, Document } from 'mongoose';

export interface IBusiness extends Document {
  name: string;
  ownerId: mongoose.Types.ObjectId;
  websiteUrl: string;
  widgetSettings: {
    primaryColor: string;
    welcomeText: string;
    whatsappNumber?: string;
    logoUrl?: string;
    enabledFeatures: string[];
    businessHours: {
      day: string;
      open: string;
      close: string;
      enabled: boolean;
    }[];
  };
  subscription: {
    plan: 'free' | 'pro' | 'premium' | 'extra_premium';
    status: string;
    razorpaySubscriptionId?: string;
    leadsUsed: number;
    leadsLimit: number;
  };
  integrations: {
    zoom?: {
      accessToken: string;
      refreshToken: string;
    };
    googleMeet?: {
      accessToken: string;
      refreshToken: string;
    };
  };
  createdAt: Date;
}

const BusinessSchema: Schema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  websiteUrl: { type: String },
  widgetSettings: {
    primaryColor: { type: String, default: '#007bff' },
    welcomeText: { type: String, default: 'How can we help you today?' },
    whatsappNumber: { type: String },
    logoUrl: { type: String },
    enabledFeatures: { type: [String], default: ['live_chat', 'whatsapp', 'booking', 'callback', 'message'] },
    businessHours: [{
      day: String,
      open: String,
      close: String,
      enabled: Boolean
    }]
  },
  subscription: {
    plan: { type: String, enum: ['free', 'pro', 'premium', 'extra_premium'], default: 'free' },
    status: { type: String, default: 'active' },
    razorpaySubscriptionId: { type: String },
    leadsUsed: { type: Number, default: 0 },
    leadsLimit: { type: Number, default: 50 }
  },
  integrations: {
    zoom: {
      accessToken: String,
      refreshToken: String
    },
    googleMeet: {
      accessToken: String,
      refreshToken: String
    }
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBusiness>('Business', BusinessSchema);
