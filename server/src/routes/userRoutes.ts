import { Router } from 'express';
import { getProfile, updateProfile, getUserStats } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/stats', getUserStats);

export default router;
