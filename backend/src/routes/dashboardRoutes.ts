import express from 'express';
import { getStats, getLeads, getBookings, updateWidgetSettings } from '../controllers/dashboardController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/stats', getStats);
router.get('/leads', getLeads);
router.get('/bookings', getBookings);
router.put('/widget-settings', updateWidgetSettings);

export default router;
