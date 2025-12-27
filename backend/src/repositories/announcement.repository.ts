import prisma from '../config/database';
import { Announcement } from '../models/communication.types';

/**
 * Announcement Repository - Database operations for announcements
 */
export class AnnouncementRepository {
  async findById(id: string): Promise<Announcement | null> {
    return prisma.announcement.findUnique({ where: { id } }) as unknown as Announcement | null;
  }

  async findForUser(userId: string, userRole: string): Promise<Announcement[]> {
    return prisma.announcement.findMany({
      where: {
        isPublished: true,
        OR: [
          { targetAudience: 'all' },
          { targetAudience: userRole.toLowerCase() + 's' },
          { recipientIds: { has: userId } },
        ],
      },
      orderBy: { publishedAt: 'desc' },
    }) as unknown as Announcement[];
  }

  async create(data: Partial<Announcement>): Promise<Announcement> {
    return prisma.announcement.create({ data: data as any }) as unknown as Announcement;
  }

  async update(id: string, data: Partial<Announcement>): Promise<Announcement> {
    return prisma.announcement.update({ where: { id }, data: data as any }) as unknown as Announcement;
  }

  async delete(id: string): Promise<void> {
    await prisma.announcement.delete({ where: { id } });
  }
}
