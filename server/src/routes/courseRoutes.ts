import { Router } from 'express';
import {
  getAllCourses,
  getCourseBySlug,
  enrollCourse,
  updateLessonProgress,
} from '../controllers/courseController';
import { optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.get('/', getAllCourses);
router.get('/:slug', optionalAuthenticate, getCourseBySlug);
router.post('/:id/enroll', optionalAuthenticate, enrollCourse);
router.put('/:id/progress', optionalAuthenticate, updateLessonProgress);

export default router;
