import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize, authorizeOwnerOrAdmin } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { updateUserSchema } from '../utils/validators';
import { UserRole } from '../models/enums';

const router = Router();
const userController = new UserController();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', userController.getCurrentUser);

/**
 * @route   PUT /api/v1/users/me
 * @desc    Update current user profile
 * @access  Private
 */
router.put('/me', validate(updateUserSchema), userController.updateCurrentUser);

/**
 * @route   GET /api/v1/users/:userId
 * @desc    Get user by ID
 * @access  Private (Owner or Admin)
 */
router.get('/:userId', authorizeOwnerOrAdmin(), userController.getUserById);

/**
 * @route   GET /api/v1/users
 * @desc    Get all users (Admin only)
 * @access  Private (Admin)
 */
router.get('/', authorize(UserRole.ADMIN), userController.getAllUsers);

/**
 * @route   GET /api/v1/users/students/list
 * @desc    Get teacher's students
 * @access  Private (Teacher)
 */
router.get('/students/list', authorize(UserRole.TEACHER), userController.getStudents);

export default router;
