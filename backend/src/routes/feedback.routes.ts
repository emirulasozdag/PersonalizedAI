import { Router } from 'express';
import { FeedbackController } from '../controllers/feedback.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { submitFeedbackSchema } from '../utils/validators';
import { UserRole } from '../models/enums';

const router = Router();
const feedbackController = new FeedbackController();

router.use(authenticate);

/**
 * @route   POST /api/v1/feedback
 * @desc    Submit feedback
 * @access  Private
 */
router.post('/', validate(submitFeedbackSchema), feedbackController.submitFeedback);

/**
 * @route   GET /api/v1/feedback/me
 * @desc    Get user's feedback submissions
 * @access  Private
 */
router.get('/me', feedbackController.getMyFeedback);

/**
 * @route   GET /api/v1/feedback
 * @desc    Get all feedback (Admin)
 * @access  Private (Admin)
 */
router.get('/', authorize(UserRole.ADMIN), feedbackController.getAllFeedback);

/**
 * @route   GET /api/v1/feedback/:feedbackId
 * @desc    Get feedback by ID
 * @access  Private
 */
router.get('/:feedbackId', feedbackController.getFeedbackById);

/**
 * @route   PUT /api/v1/feedback/:feedbackId/status
 * @desc    Update feedback status (Admin)
 * @access  Private (Admin)
 */
router.put('/:feedbackId/status', authorize(UserRole.ADMIN), feedbackController.updateFeedbackStatus);

export default router;
