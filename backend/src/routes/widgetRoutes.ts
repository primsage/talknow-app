import express from 'express';
import { getWidgetConfig, submitLead, createBooking, getChatHistory } from '../controllers/widgetController';

const router = express.Router();

router.get('/config/:businessId', getWidgetConfig);
router.post('/lead/:businessId', submitLead);
router.post('/booking/:businessId', createBooking);
router.get('/chat/:businessId/:visitorId', getChatHistory);

export default router;
