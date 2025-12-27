import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { sendMessageSchema, createAnnouncementSchema } from '../utils/validators';
import { UserRole } from '../models/enums';

const router = Router();
const messageController = new MessageController();

router.use(authenticate);

/**
 * @route   POST /api/v1/messages
 * @desc    Send a message
 * @access  Private
 */
router.post('/', validate(sendMessageSchema), messageController.sendMessage);

/**
 * @route   GET /api/v1/messages/inbox
 * @desc    Get inbox messages
 * @access  Private
 */
router.get('/inbox', messageController.getInbox);

/**
 * @route   GET /api/v1/messages/sent
 * @desc    Get sent messages
 * @access  Private
 */
router.get('/sent', messageController.getSentMessages);

/**
 * @route   GET /api/v1/messages/unread-count
 * @desc    Get unread message count
 * @access  Private
 */
router.get('/unread-count', messageController.getUnreadCount);

/**
 * @route   GET /api/v1/messages/:messageId
 * @desc    Get message by ID
 * @access  Private
 */
router.get('/:messageId', messageController.getMessageById);

/**
 * @route   POST /api/v1/messages/announcements
 * @desc    Create announcement
 * @access  Private (Teacher, Admin)
 */
router.post(
  '/announcements',
  authorize(UserRole.TEACHER, UserRole.ADMIN),
  validate(createAnnouncementSchema),
  messageController.createAnnouncement
);

/**
 * @route   GET /api/v1/messages/announcements/list
 * @desc    Get announcements
 * @access  Private
 */
router.get('/announcements/list', messageController.getAnnouncements);

export default router;
