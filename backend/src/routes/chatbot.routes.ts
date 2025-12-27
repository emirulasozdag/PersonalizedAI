import { Router } from 'express';
import { ChatbotController } from '../controllers/chatbot.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { chatMessageSchema } from '../utils/validators';
import { UserRole } from '../models/enums';

const router = Router();
const chatbotController = new ChatbotController();

router.use(authenticate);
router.use(authorize(UserRole.STUDENT));

/**
 * @route   POST /api/v1/chatbot/message
 * @desc    Send message to chatbot
 * @access  Private (Student)
 */
router.post('/message', validate(chatMessageSchema), chatbotController.sendMessage);

/**
 * @route   GET /api/v1/chatbot/sessions
 * @desc    Get chat sessions
 * @access  Private (Student)
 */
router.get('/sessions', chatbotController.getSessions);

/**
 * @route   GET /api/v1/chatbot/sessions/:sessionId
 * @desc    Get session history
 * @access  Private (Student)
 */
router.get('/sessions/:sessionId', chatbotController.getSessionHistory);

/**
 * @route   POST /api/v1/chatbot/sessions/:sessionId/end
 * @desc    End chat session
 * @access  Private (Student)
 */
router.post('/sessions/:sessionId/end', chatbotController.endSession);

export default router;
