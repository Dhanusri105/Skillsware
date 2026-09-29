import { Router } from 'express';
import {
  getRoadmaps,
  getRoadmapById,
  generateRoadmap,
  toggleTask,
} from '../controllers/roadmapController';
import { optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.use(optionalAuthenticate);
router.get('/', getRoadmaps);
router.post('/', generateRoadmap);
router.post('/generate', generateRoadmap);
router.get('/:id', getRoadmapById);
router.put('/:id/tasks/:taskId', toggleTask);

export default router;
