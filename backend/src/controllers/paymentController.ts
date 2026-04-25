import { Request, Response } from 'express';
import crypto from 'crypto';
import razorpay from '../config/razorpay';
import Business from '../models/Business';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { plan } = req.body;
    const businessId = (req as any).user.businessId;

    let amount = 0;
    let leadsLimit = 50;

    switch (plan) {
      case 'pro':
        amount = 2900; // 29.00 INR or USD depending on currency
        leadsLimit = 1000;
        break;
      case 'premium':
        amount = 9900;
        leadsLimit = 5000;
        break;
      case 'extra_premium':
        amount = 19900;
        leadsLimit = 100000; // Unlimited practically
        break;
      default:
        return res.status(400).json({ message: 'Invalid plan' });
    }

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${businessId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, plan, leadsLimit });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, leadsLimit } = req.body;
    const businessId = (req as any).user.businessId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret')
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Business.findByIdAndUpdate(businessId, {
        $set: {
          'subscription.plan': plan,
          'subscription.leadsLimit': leadsLimit,
          'subscription.status': 'active'
        }
      });
      res.json({ status: 'success' });
    } else {
      res.status(400).json({ status: 'failure' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
