import prisma from '../config/database';
import { Message } from '../models/communication.types';

/**
 * Message Repository - Database operations for messages
 */
export class MessageRepository {
  async findById(id: string): Promise<Message | null> {
    return prisma.message.findUnique({ where: { id } }) as unknown as Message | null;
  }

  async findByRecipientId(recipientId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: { recipientId },
      orderBy: { createdAt: 'desc' },
    }) as unknown as Message[];
  }

  async findBySenderId(senderId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: { senderId },
      orderBy: { createdAt: 'desc' },
    }) as unknown as Message[];
  }

  async create(data: Partial<Message>): Promise<Message> {
    return prisma.message.create({ data: data as any }) as unknown as Message;
  }

  async markAsRead(id: string): Promise<void> {
    await prisma.message.update({
      where: { id },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return prisma.message.count({
      where: { recipientId: userId, isRead: false },
    });
  }
}
