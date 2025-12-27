import { Router } from 'express';
import { RewardController } from '../controllers/reward.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../models/enums';

const router = Router();
const rewardController = new RewardController();

router.use(authenticate);

/**
 * @route   GET /api/v1/rewards/me
 * @desc    Get current user's rewards
 * @access  Private (Student)
 */
router.get('/me', authorize(UserRole.STUDENT), rewardController.getMyRewards);

/**
 * @route   GET /api/v1/rewards/available
 * @desc    Get available rewards
 * @access  Private
 */
router.get('/available', rewardController.getAvailableRewards);

/**
 * @route   POST /api/v1/rewards/check
 * @desc    Check and award earned rewards
 * @access  Private (Student)
 */
router.post('/check', authorize(UserRole.STUDENT), rewardController.checkRewards);

/**
 * @route   GET /api/v1/rewards/student/:studentId
 * @desc    Get student's rewards (for teachers)
 * @access  Private (Teacher)
 */
router.get('/student/:studentId', authorize(UserRole.TEACHER), rewardController.getStudentRewards);

export default router;
