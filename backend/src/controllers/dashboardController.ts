import { Request, Response } from 'express';
import Lead from '../models/Lead';
import Booking from '../models/Booking';
import Message from '../models/Message';
import Business from '../models/Business';

export const getStats = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const businessId = user.businessId;

    const totalLeads = await Lead.countDocuments({ businessId });
    const leadsToday = await Lead.countDocuments({
      businessId,
      createdAt: { $gte: new Date().setHours(0,0,0,0) }
    });
    const totalBookings = await Booking.countDocuments({ businessId });
    const activeChats = await Message.distinct('visitorId', { businessId });

    res.json({
      totalLeads,
      leadsToday,
      totalBookings,
      totalChats: activeChats.length
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const businessId = (req as any).user.businessId;
    const leads = await Lead.find({ businessId }).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const businessId = (req as any).user.businessId;
    const bookings = await Booking.find({ businessId }).sort({ startTime: 1 });
    res.json(bookings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateWidgetSettings = async (req: Request, res: Response) => {
  try {
    const businessId = (req as any).user.businessId;
    const business = await Business.findByIdAndUpdate(
      businessId,
      { $set: { widgetSettings: req.body } },
      { new: true }
    );
    res.json(business?.widgetSettings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
