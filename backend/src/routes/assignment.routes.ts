import { Router } from 'express';
import { AssignmentController } from '../controllers/assignment.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createAssignmentSchema,
  submitAssignmentSchema,
  gradeAssignmentSchema,
} from '../utils/validators';
import { UserRole } from '../models/enums';

const router = Router();
const assignmentController = new AssignmentController();

router.use(authenticate);

/**
 * @route   POST /api/v1/assignments
 * @desc    Create a new assignment
 * @access  Private (Teacher)
 */
router.post(
  '/',
  authorize(UserRole.TEACHER),
  validate(createAssignmentSchema),
  assignmentController.createAssignment
);

/**
 * @route   GET /api/v1/assignments/teacher
 * @desc    Get teacher's assignments
 * @access  Private (Teacher)
 */
router.get('/teacher', authorize(UserRole.TEACHER), assignmentController.getTeacherAssignments);

/**
 * @route   GET /api/v1/assignments/student
 * @desc    Get student's assignments
 * @access  Private (Student)
 */
router.get('/student', authorize(UserRole.STUDENT), assignmentController.getStudentAssignments);

/**
 * @route   GET /api/v1/assignments/:assignmentId
 * @desc    Get assignment by ID
 * @access  Private
 */
router.get('/:assignmentId', assignmentController.getAssignmentById);

/**
 * @route   POST /api/v1/assignments/submit
 * @desc    Submit assignment
 * @access  Private (Student)
 */
router.post(
  '/submit',
  authorize(UserRole.STUDENT),
  validate(submitAssignmentSchema),
  assignmentController.submitAssignment
);

/**
 * @route   POST /api/v1/assignments/:studentAssignmentId/grade
 * @desc    Grade assignment
 * @access  Private (Teacher)
 */
router.post(
  '/:studentAssignmentId/grade',
  authorize(UserRole.TEACHER),
  validate(gradeAssignmentSchema),
  assignmentController.gradeAssignment
);

export default router;
