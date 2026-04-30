import { Request, Response } from 'express';
import crypto from 'crypto';
import Business from '../models/Business';

export const handleRazorpayWebhook = async (req: Request, res: Response) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret';
  const signature = req.headers['x-razorpay-signature'] as string;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature === expectedSignature) {
    const { event, payload } = req.body;

    if (event === 'subscription.activated' || event === 'subscription.charged') {
      const subscriptionId = payload.subscription.entity.id;
      // In a real app, we'd find the business by subscriptionId and update its status
      console.log(`Subscription ${subscriptionId} updated via webhook`);
    }

    res.status(200).send('OK');
  } else {
    res.status(400).send('Invalid signature');
  }
};
