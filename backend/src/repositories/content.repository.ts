import prisma from '../config/database';
import { Content, Topic } from '../models/content.types';
import { LanguageLevel, ContentType } from '../models/enums';

/**
 * Content Repository - Database operations for learning content
 */
export class ContentRepository {
  async findById(id: string): Promise<Content | null> {
    return prisma.content.findUnique({ where: { id } }) as unknown as Content | null;
  }

  async findByLevel(level: LanguageLevel, type?: ContentType): Promise<Content[]> {
    const where: any = { level };
    if (type) where.type = type;
    return prisma.content.findMany({ where, orderBy: { order: 'asc' } }) as unknown as Content[];
  }

  async findTopics(level?: LanguageLevel): Promise<Topic[]> {
    const where = level ? { level } : {};
    return prisma.topic.findMany({ where, orderBy: { order: 'asc' } }) as unknown as Topic[];
  }

  async create(data: Partial<Content>): Promise<Content> {
    return prisma.content.create({ data: data as any }) as unknown as Content;
  }

  async update(id: string, data: Partial<Content>): Promise<Content | null> {
    return prisma.content.update({ where: { id }, data: data as any }) as unknown as Content;
  }

  async delete(id: string): Promise<void> {
    await prisma.content.delete({ where: { id } });
  }
}
