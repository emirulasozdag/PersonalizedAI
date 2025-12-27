import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../models/enums';

const router = Router();
const adminController = new AdminController();

// All routes require admin authentication
router.use(authenticate);
router.use(authorize(UserRole.ADMIN));

/**
 * @route   GET /api/v1/admin/stats
 * @desc    Get system statistics
 * @access  Private (Admin)
 */
router.get('/stats', adminController.getSystemStats);

/**
 * @route   GET /api/v1/admin/users
 * @desc    Get all users
 * @access  Private (Admin)
 */
router.get('/users', adminController.getAllUsers);

/**
 * @route   PUT /api/v1/admin/users/:userId/role
 * @desc    Update user role
 * @access  Private (Admin)
 */
router.put('/users/:userId/role', adminController.updateUserRole);

/**
 * @route   POST /api/v1/admin/users/:userId/deactivate
 * @desc    Deactivate user account
 * @access  Private (Admin)
 */
router.post('/users/:userId/deactivate', adminController.deactivateUser);

/**
 * @route   POST /api/v1/admin/users/:userId/reactivate
 * @desc    Reactivate user account
 * @access  Private (Admin)
 */
router.post('/users/:userId/reactivate', adminController.reactivateUser);

/**
 * @route   POST /api/v1/admin/maintenance/enable
 * @desc    Enable maintenance mode
 * @access  Private (Admin)
 */
router.post('/maintenance/enable', adminController.enableMaintenanceMode);

/**
 * @route   POST /api/v1/admin/maintenance/:maintenanceId/disable
 * @desc    Disable maintenance mode
 * @access  Private (Admin)
 */
router.post('/maintenance/:maintenanceId/disable', adminController.disableMaintenanceMode);

/**
 * @route   GET /api/v1/admin/logs
 * @desc    Get system logs
 * @access  Private (Admin)
 */
router.get('/logs', adminController.getSystemLogs);

/**
 * @route   GET /api/v1/admin/performance
 * @desc    Get performance metrics
 * @access  Private (Admin)
 */
router.get('/performance', adminController.getPerformanceMetrics);

export default router;
