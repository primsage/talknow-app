import express from 'express';
import { getAllUsers, getAllBusinesses, updateSubscription } from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.use(authenticate, authorize(['admin']));

router.get('/users', getAllUsers);
router.get('/businesses', getAllBusinesses);
router.put('/subscription/:businessId', updateSubscription);

export default router;
