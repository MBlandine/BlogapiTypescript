import { Router } from 'express';
import { register, login, profile } from '../controllers/auth';
// import { getProfile } from '../controllers/auth';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
// router.get('/profile/details', authMiddleware, getProfile);

export default router;