import express from 'express';
import { getStats, getLeads, getBookings, updateWidgetSettings, getSessions, getHeatmapData } from '../controllers/dashboardController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/stats', getStats);
router.get('/leads', getLeads);
router.get('/leads/export', exportLeads);
router.get('/bookings', getBookings);
router.put('/widget-settings', updateWidgetSettings);
router.get('/sessions', getSessions);
router.get('/heatmap', getHeatmapData);

export default router;
