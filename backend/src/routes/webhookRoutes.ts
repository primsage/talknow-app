import express from 'express';
import { handleRazorpayWebhook } from '../controllers/webhookController';

const router = express.Router();

router.post('/razorpay', express.json(), handleRazorpayWebhook);

export default router;
