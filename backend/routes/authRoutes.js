import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  changePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/profile', protect, getUserProfile);
router.post('/change-password', protect, changePassword);

export default router;