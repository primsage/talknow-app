import { Request, Response } from 'express';
import Lead from '../models/Lead';
import Booking from '../models/Booking';
import Business from '../models/Business';
import Message from '../models/Message';
import Session from '../models/Session';
import { createGoogleMeet, createZoomMeeting } from '../services/meetingService';

export const getWidgetConfig = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findById(businessId).select('name widgetSettings subscription.plan');
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.json(business);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const trackEvents = async (req: Request, res: Response) => {
  try {
    const { businessId, sessionId, events, screen } = req.body;

    const business = await Business.findById(businessId);
    if (!business || business.subscription.plan === 'free') {
      return res.status(403).json({ message: 'Tracking not allowed on this plan' });
    }

    let session = await Session.findOne({ businessId, sessionId });

    if (!session) {
      session = new Session({
        businessId,
        sessionId,
        screen,
        events: []
      });
    }

    session.events.push(...events);
    await session.save();

    res.status(200).json({ status: 'success' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const submitLead = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    const { type, name, email, phone, message, preferredTime, visitorInfo } = req.body;

    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ message: 'Business not found' });

    if (business.subscription.leadsUsed >= business.subscription.leadsLimit) {
      return res.status(403).json({ message: 'Lead limit reached for this business' });
    }

    const lead = new Lead({
      businessId,
      type,
      name,
      email,
      phone,
      message,
      preferredTime,
      visitorInfo
    });
    await lead.save();

    business.subscription.leadsUsed += 1;
    await business.save();

    res.status(201).json(lead);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    const { visitorName, visitorEmail, visitorPhone, startTime, endTime, type } = req.body;

    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ message: 'Business not found' });

    let meetingLink = '';
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (type === 'google_meet' && business.integrations.googleMeet?.accessToken) {
      meetingLink = await createGoogleMeet(
        business.integrations.googleMeet.accessToken,
        business.integrations.googleMeet.refreshToken!,
        start,
        end,
        `Meeting with ${visitorName}`
      ) || '';
    } else if (type === 'zoom' && business.integrations.zoom?.accessToken) {
      const duration = Math.round((end.getTime() - start.getTime()) / 60000);
      meetingLink = await createZoomMeeting(
        business.integrations.zoom.accessToken,
        start,
        duration,
        `Meeting with ${visitorName}`
      ) || '';
    }

    const booking = new Booking({
      businessId,
      visitorName,
      visitorEmail,
      visitorPhone,
      startTime,
      endTime,
      type,
      meetingLink
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err: any) {
    console.error('Booking error:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { businessId, visitorId } = req.params;
    const messages = await Message.find({ businessId, visitorId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
