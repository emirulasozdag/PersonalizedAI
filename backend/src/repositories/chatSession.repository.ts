import prisma from '../config/database';
import { ChatSession, ChatMessage } from '../models/communication.types';

/**
 * Chat Session Repository - Database operations for chat sessions
 */
export class ChatSessionRepository {
  async findById(id: string): Promise<ChatSession | null> {
    return prisma.chatSession.findUnique({ where: { id } }) as unknown as ChatSession | null;
  }

  async findByStudentId(studentId: string): Promise<ChatSession[]> {
    return prisma.chatSession.findMany({
      where: { studentId },
      orderBy: { startedAt: 'desc' },
    }) as unknown as ChatSession[];
  }

  async create(data: Partial<ChatSession>): Promise<ChatSession> {
    return prisma.chatSession.create({ data: data as any }) as unknown as ChatSession;
  }

  async update(id: string, data: Partial<ChatSession>): Promise<ChatSession> {
    return prisma.chatSession.update({ where: { id }, data: data as any }) as unknown as ChatSession;
  }

  async addMessage(data: Partial<ChatMessage>): Promise<ChatMessage> {
    return prisma.chatMessage.create({ data: data as any }) as unknown as ChatMessage;
  }

  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    return prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    }) as unknown as ChatMessage[];
  }

  async incrementMessageCount(sessionId: string): Promise<void> {
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { messageCount: { increment: 1 } },
    });
  }
}
