import { Request, Response, NextFunction } from 'express';
import { MessageService, AnnouncementService } from '../services/message.service';
import { sendSuccess, sendCreated } from '../utils/response';

export class MessageController {
  private messageService: MessageService;
  private announcementService: AnnouncementService;

  constructor() {
    this.messageService = new MessageService();
    this.announcementService = new AnnouncementService();
  }

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.messageService.sendMessage(req.user!.userId, req.body);
      sendCreated(res, message, 'Message sent successfully');
    } catch (error) {
      next(error);
    }
  };

  getInbox = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await this.messageService.getInbox(req.user!.userId);
      sendSuccess(res, messages);
    } catch (error) {
      next(error);
    }
  };

  getSentMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await this.messageService.getSentMessages(req.user!.userId);
      sendSuccess(res, messages);
    } catch (error) {
      next(error);
    }
  };

  getUnreadCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await this.messageService.getUnreadCount(req.user!.userId);
      sendSuccess(res, { count });
    } catch (error) {
      next(error);
    }
  };

  getMessageById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.messageService.getMessageById(
        req.user!.userId,
        req.params.messageId
      );
      sendSuccess(res, message);
    } catch (error) {
      next(error);
    }
  };

  createAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = await this.announcementService.createAnnouncement(
        req.user!.userId,
        req.body
      );
      sendCreated(res, announcement, 'Announcement created successfully');
    } catch (error) {
      next(error);
    }
  };

  getAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcements = await this.announcementService.getAnnouncementsForUser(
        req.user!.userId,
        req.user!.role
      );
      sendSuccess(res, announcements);
    } catch (error) {
      next(error);
    }
  };
}
