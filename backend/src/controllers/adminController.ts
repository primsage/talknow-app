import { Request, Response } from 'express';
import User from '../models/User';
import Business from '../models/Business';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('businessId');
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBusinesses = async (req: Request, res: Response) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    const { plan, leadsLimit } = req.body;
    const business = await Business.findByIdAndUpdate(
      businessId,
      {
        $set: {
          'subscription.plan': plan,
          'subscription.leadsLimit': leadsLimit
        }
      },
      { new: true }
    );
    res.json(business);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
