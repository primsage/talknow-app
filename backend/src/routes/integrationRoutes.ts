import express from 'express';
import { googleAuth, googleCallback, zoomAuth, zoomCallback } from '../controllers/integrationController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/google', authenticate, googleAuth);
router.get('/google/callback', googleCallback);
router.get('/zoom', authenticate, zoomAuth);
router.get('/zoom/callback', zoomCallback);

export default router;
