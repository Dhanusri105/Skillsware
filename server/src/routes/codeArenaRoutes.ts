import { Router } from 'express';
import {
  getAllProblems,
  getProblemBySlug,
  runCode,
  submitSolution,
  getSubmissions,
} from '../controllers/codeArenaController';
import { optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.get('/problems', getAllProblems);
router.get('/problems/:slug', optionalAuthenticate, getProblemBySlug);
router.post('/code/run', optionalAuthenticate, runCode);
router.post('/code/submit', optionalAuthenticate, submitSolution);
router.get('/code/submissions', optionalAuthenticate, getSubmissions);

export default router;
