import { Router } from 'express';
import {
  getAllSkills,
  getSkillProfile,
  getAssessmentBySkill,
  submitAssessment,
} from '../controllers/skillController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.get('/', getAllSkills);
router.get('/profile', optionalAuthenticate, getSkillProfile);
router.get('/assessment/:skillSlug', getAssessmentBySkill);
router.post('/assessment', optionalAuthenticate, submitAssessment);
router.get('/assessment/history', optionalAuthenticate, getSkillProfile);

export default router;
