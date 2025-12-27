import { MessageRepository } from '../repositories/message.repository';
import { AnnouncementRepository } from '../repositories/announcement.repository';
import {
  Message,
  Announcement,
  SendMessageDTO,
  CreateAnnouncementDTO,
} from '../models/communication.types';
import { MessageType } from '../models/enums';
import { NotFoundError, ForbiddenError } from '../middleware/errorHandler';
import { NotificationService } from './external/notification.service';
import { logger } from '../utils/logger';

export class MessageService {
  private messageRepository: MessageRepository;
  private notificationService: NotificationService;

  constructor() {
    this.messageRepository = new MessageRepository();
    this.notificationService = new NotificationService();
  }

  /**
   * Send a message
   */
  async sendMessage(
    senderId: string,
    data: SendMessageDTO
  ): Promise<Message> {
    const message = await this.messageRepository.create({
      senderId,
      recipientId: data.recipientId,
      subject: data.subject,
      content: data.content,
      type: MessageType.DIRECT,
      isRead: false,
    });

    await this.notificationService.sendMessageNotification(
      data.recipientId,
      senderId,
      data.subject
    );

    logger.info(`Message sent from ${senderId} to ${data.recipientId}`);
    return message;
  }

  /**
   * Get user's inbox
   */
  async getInbox(userId: string): Promise<Message[]> {
    return this.messageRepository.findByRecipientId(userId);
  }

  /**
   * Get user's sent messages
   */
  async getSentMessages(userId: string): Promise<Message[]> {
    return this.messageRepository.findBySenderId(userId);
  }

  /**
   * Get message by ID
   */
  async getMessageById(
    userId: string,
    messageId: string
  ): Promise<Message> {
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new NotFoundError('Message not found');
    }

    // Check access
    if (message.senderId !== userId && message.recipientId !== userId) {
      throw new ForbiddenError('Access denied');
    }

    // Mark as read if recipient
    if (message.recipientId === userId && !message.isRead) {
      await this.messageRepository.markAsRead(messageId);
    }

    return message;
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string): Promise<number> {
    return this.messageRepository.getUnreadCount(userId);
  }
}

export class AnnouncementService {
  private announcementRepository: AnnouncementRepository;
  private notificationService: NotificationService;

  constructor() {
    this.announcementRepository = new AnnouncementRepository();
    this.notificationService = new NotificationService();
  }

  /**
   * Create an announcement
   */
  async createAnnouncement(
    authorId: string,
    data: CreateAnnouncementDTO
  ): Promise<Announcement> {
    const announcement = await this.announcementRepository.create({
      authorId,
      ...data,
      isPublished: true,
      publishedAt: new Date(),
    });

    // Send notifications based on target audience
    await this.notificationService.sendAnnouncementNotifications(
      announcement.id,
      data.targetAudience,
      data.recipientIds
    );

    logger.info(`Announcement created: ${announcement.id} by ${authorId}`);
    return announcement;
  }

  /**
   * Get announcements for a user
   */
  async getAnnouncementsForUser(
    userId: string,
    userRole: string
  ): Promise<Announcement[]> {
    return this.announcementRepository.findForUser(userId, userRole);
  }

  /**
   * Get announcement by ID
   */
  async getAnnouncementById(announcementId: string): Promise<Announcement> {
    const announcement = await this.announcementRepository.findById(announcementId);
    if (!announcement) {
      throw new NotFoundError('Announcement not found');
    }
    return announcement;
  }

  /**
   * Update announcement
   */
  async updateAnnouncement(
    authorId: string,
    announcementId: string,
    updates: Partial<Announcement>
  ): Promise<Announcement> {
    const announcement = await this.getAnnouncementById(announcementId);

    if (announcement.authorId !== authorId) {
      throw new ForbiddenError('Not authorized to update this announcement');
    }

    return this.announcementRepository.update(announcementId, updates);
  }

  /**
   * Delete announcement
   */
  async deleteAnnouncement(
    authorId: string,
    announcementId: string
  ): Promise<void> {
    const announcement = await this.getAnnouncementById(announcementId);

    if (announcement.authorId !== authorId) {
      throw new ForbiddenError('Not authorized to delete this announcement');
    }

    await this.announcementRepository.delete(announcementId);
    logger.info(`Announcement deleted: ${announcementId}`);
  }
}
