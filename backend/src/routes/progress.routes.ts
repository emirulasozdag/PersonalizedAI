import { Router } from 'express';
import { ProgressController } from '../controllers/progress.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../models/enums';

const router = Router();
const progressController = new ProgressController();

router.use(authenticate);

/**
 * @route   GET /api/v1/progress/me
 * @desc    Get current user's progress summary
 * @access  Private (Student)
 */
router.get('/me', authorize(UserRole.STUDENT), progressController.getMyProgress);

/**
 * @route   GET /api/v1/progress/me/skill/:skill
 * @desc    Get skill-specific progress
 * @access  Private (Student)
 */
router.get('/me/skill/:skill', authorize(UserRole.STUDENT), progressController.getSkillProgress);

/**
 * @route   GET /api/v1/progress/charts/:type
 * @desc    Get chart data
 * @access  Private (Student)
 */
router.get('/charts/:type', authorize(UserRole.STUDENT), progressController.getChartData);

/**
 * @route   POST /api/v1/progress/export
 * @desc    Export progress data
 * @access  Private (Student)
 */
router.post('/export', authorize(UserRole.STUDENT), progressController.exportProgress);

/**
 * @route   GET /api/v1/progress/student/:studentId
 * @desc    Get student's progress (for teachers)
 * @access  Private (Teacher)
 */
router.get('/student/:studentId', authorize(UserRole.TEACHER), progressController.getStudentProgress);

/**
 * @route   GET /api/v1/progress/students
 * @desc    Get all students' progress (for teachers)
 * @access  Private (Teacher)
 */
router.get('/students', authorize(UserRole.TEACHER), progressController.getAllStudentsProgress);

export default router;
