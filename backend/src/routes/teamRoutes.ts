import express from 'express';
import { getTeam, addAgent, removeAgent } from '../controllers/teamController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);
router.use(authorize(['business_owner']));

router.get('/', getTeam);
router.post('/', addAgent);
router.delete('/:id', removeAgent);

export default router;
