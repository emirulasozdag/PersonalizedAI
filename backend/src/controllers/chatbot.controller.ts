import { Request, Response, NextFunction } from 'express';
import { ChatbotService } from '../services/chatbot.service';
import { sendSuccess, sendCreated } from '../utils/response';

export class ChatbotController {
  private chatbotService: ChatbotService;

  constructor() {
    this.chatbotService = new ChatbotService();
  }

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.chatbotService.sendMessage(req.user!.userId, req.body);
      sendSuccess(res, response);
    } catch (error) {
      next(error);
    }
  };

  getSessions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessions = await this.chatbotService.getStudentSessions(req.user!.userId);
      sendSuccess(res, sessions);
    } catch (error) {
      next(error);
    }
  };

  getSessionHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await this.chatbotService.getSessionHistory(
        req.user!.userId,
        req.params.sessionId
      );
      sendSuccess(res, messages);
    } catch (error) {
      next(error);
    }
  };

  endSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.chatbotService.endSession(req.user!.userId, req.params.sessionId);
      sendSuccess(res, null, 'Session ended');
    } catch (error) {
      next(error);
    }
  };
}
