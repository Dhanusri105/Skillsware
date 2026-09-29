import { Router } from 'express';
import {
  getMyPortfolio,
  updatePortfolio,
  getPublicPortfolio,
} from '../controllers/portfolioController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.get('/portfolio', optionalAuthenticate, getMyPortfolio);
router.post('/portfolio', optionalAuthenticate, updatePortfolio);
router.put('/portfolio', optionalAuthenticate, updatePortfolio);
router.get('/portfolio/public/:slug', getPublicPortfolio);

export default router;
