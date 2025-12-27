import prisma from '../config/database';
import { Feedback } from '../models/communication.types';

/**
 * Feedback Repository - Database operations for user feedback
 */
export class FeedbackRepository {
  async findById(id: string): Promise<Feedback | null> {
    return prisma.feedback.findUnique({ where: { id } }) as unknown as Feedback | null;
  }

  async findByUserId(userId: string): Promise<Feedback[]> {
    return prisma.feedback.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }) as unknown as Feedback[];
  }

  async findAll(status?: string): Promise<Feedback[]> {
    const where = status ? { status } : {};
    return prisma.feedback.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    }) as unknown as Feedback[];
  }

  async create(data: Partial<Feedback>): Promise<Feedback> {
    return prisma.feedback.create({ data: data as any }) as unknown as Feedback;
  }

  async update(id: string, data: Partial<Feedback>): Promise<Feedback> {
    return prisma.feedback.update({ where: { id }, data: data as any }) as unknown as Feedback;
  }
}
