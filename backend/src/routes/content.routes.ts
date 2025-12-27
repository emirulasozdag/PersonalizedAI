import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { generateContentSchema, updateContentSchema } from '../utils/validators';
import { UserRole } from '../models/enums';

const router = Router();
const contentController = new ContentController();

router.use(authenticate);

/**
 * @route   GET /api/v1/content/topics
 * @desc    Get all topics
 * @access  Private
 */
router.get('/topics', contentController.getTopics);

/**
 * @route   GET /api/v1/content/lesson-plan
 * @desc    Get current user's lesson plan
 * @access  Private (Student)
 */
router.get('/lesson-plan', authorize(UserRole.STUDENT), contentController.getMyLessonPlan);

/**
 * @route   GET /api/v1/content/:contentId
 * @desc    Get content by ID
 * @access  Private
 */
router.get('/:contentId', contentController.getContentById);

/**
 * @route   GET /api/v1/content/level/:level
 * @desc    Get content by level
 * @access  Private
 */
router.get('/level/:level', contentController.getContentByLevel);

/**
 * @route   POST /api/v1/content/generate
 * @desc    Generate AI content
 * @access  Private (Teacher)
 */
router.post(
  '/generate',
  authorize(UserRole.TEACHER),
  validate(generateContentSchema),
  contentController.generateContent
);

/**
 * @route   PUT /api/v1/content/:contentId
 * @desc    Update content
 * @access  Private (Teacher)
 */
router.put(
  '/:contentId',
  authorize(UserRole.TEACHER),
  validate(updateContentSchema),
  contentController.updateContent
);

/**
 * @route   POST /api/v1/content/:contentId/complete
 * @desc    Mark content as completed
 * @access  Private (Student)
 */
router.post('/:contentId/complete', authorize(UserRole.STUDENT), contentController.completeContent);

/**
 * @route   POST /api/v1/content/lesson-plan/generate
 * @desc    Generate personalized lesson plan
 * @access  Private (Teacher)
 */
router.post('/lesson-plan/generate', authorize(UserRole.TEACHER), contentController.generateLessonPlan);

export default router;
