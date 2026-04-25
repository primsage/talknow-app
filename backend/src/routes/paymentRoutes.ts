import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

export default router;
