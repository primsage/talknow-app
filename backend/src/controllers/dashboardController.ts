import { Request, Response } from 'express';
import Lead from '../models/Lead';
import Booking from '../models/Booking';
import Message from '../models/Message';
import Business from '../models/Business';
import Session from '../models/Session';

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

export const exportLeads = async (req: Request, res: Response) => {
  try {
    const businessId = (req as any).user.businessId;
    const leads = await Lead.find({ businessId }).sort({ createdAt: -1 });

    let csv = 'Name,Email,Phone,Type,Status,Date\n';
    leads.forEach(l => {
      csv += `${l.name},${l.email || ''},${l.phone || ''},${l.type},${l.status},${l.createdAt.toISOString()}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const businessId = (req as any).user.businessId;
    const business = await Business.findById(businessId);
    if (!business || business.subscription.plan === 'free') {
      return res.status(403).json({ message: 'Session tracking is not available on your plan' });
    }

    const sessions = await Session.find({ businessId }).sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getHeatmapData = async (req: Request, res: Response) => {
  try {
    const businessId = (req as any).user.businessId;
    const business = await Business.findById(businessId);
    if (!business || !['premium', 'extra_premium'].includes(business.subscription.plan)) {
      return res.status(403).json({ message: 'Heatmap analysis is not available on your plan' });
    }

    const url = req.query['url'] as string;
    if (!url) return res.status(400).json({ message: 'URL is required' });

    const sessions = await Session.find({
      businessId,
      'events.url': url,
      'events.type': 'click'
    });

    const clicks = sessions.flatMap(s =>
      s.events
        .filter(e => e.type === 'click' && e.url === url)
        .map(e => ({ x: e.data.x, y: e.data.y }))
    );

    res.json(clicks);
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
