import { Router } from 'express';
import { TestController } from '../controllers/test.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { submitTestSchema, speakingSubmissionSchema } from '../utils/validators';
import { UserRole } from '../models/enums';

const router = Router();
const testController = new TestController();

router.use(authenticate);

/**
 * @route   GET /api/v1/tests/placement
 * @desc    Get placement test
 * @access  Private (Student)
 */
router.get('/placement', authorize(UserRole.STUDENT), testController.getPlacementTest);

/**
 * @route   GET /api/v1/tests/:testId
 * @desc    Get test by ID
 * @access  Private
 */
router.get('/:testId', testController.getTestById);

/**
 * @route   POST /api/v1/tests/submit
 * @desc    Submit test answers
 * @access  Private (Student)
 */
router.post('/submit', authorize(UserRole.STUDENT), validate(submitTestSchema), testController.submitTest);

/**
 * @route   POST /api/v1/tests/speaking/submit
 * @desc    Submit speaking test with audio
 * @access  Private (Student)
 */
router.post(
  '/speaking/submit',
  authorize(UserRole.STUDENT),
  validate(speakingSubmissionSchema),
  testController.submitSpeakingTest
);

/**
 * @route   GET /api/v1/tests/results/me
 * @desc    Get current user's test results
 * @access  Private (Student)
 */
router.get('/results/me', authorize(UserRole.STUDENT), testController.getMyResults);

/**
 * @route   GET /api/v1/tests/results/:resultId
 * @desc    Get test result by ID
 * @access  Private
 */
router.get('/results/:resultId', testController.getResultById);

/**
 * @route   GET /api/v1/tests/student/:studentId/results
 * @desc    Get student's test results (for teachers)
 * @access  Private (Teacher)
 */
router.get(
  '/student/:studentId/results',
  authorize(UserRole.TEACHER),
  testController.getStudentResults
);

export default router;
