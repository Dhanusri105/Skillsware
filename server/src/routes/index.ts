import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import skillRoutes from './skillRoutes';
import roadmapRoutes from './roadmapRoutes';
import courseRoutes from './courseRoutes';
import codeArenaRoutes from './codeArenaRoutes';
import portfolioRoutes from './portfolioRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/skills', skillRoutes);
router.use('/roadmaps', roadmapRoutes);
router.use('/courses', courseRoutes);
router.use('/', codeArenaRoutes); // exposes /problems, /code/run, /code/submit, /code/submissions
router.use('/', portfolioRoutes); // exposes /portfolio, /portfolio/public/:slug

export default router;
