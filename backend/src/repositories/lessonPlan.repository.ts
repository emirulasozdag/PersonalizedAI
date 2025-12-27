import prisma from '../config/database';
import { LessonPlan } from '../models/content.types';

/**
 * Lesson Plan Repository - Database operations for lesson plans
 */
export class LessonPlanRepository {
  async findById(id: string): Promise<LessonPlan | null> {
    return prisma.lessonPlan.findUnique({
      where: { id },
      include: { items: true },
    }) as unknown as LessonPlan | null;
  }

  async findActiveByStudentId(studentId: string): Promise<LessonPlan | null> {
    return prisma.lessonPlan.findFirst({
      where: { studentId, isActive: true },
      include: { items: { orderBy: { order: 'asc' } } },
    }) as unknown as LessonPlan | null;
  }

  async findByStudentId(studentId: string): Promise<LessonPlan[]> {
    return prisma.lessonPlan.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    }) as unknown as LessonPlan[];
  }

  async create(data: Partial<LessonPlan>): Promise<LessonPlan> {
    return prisma.lessonPlan.create({ data: data as any }) as unknown as LessonPlan;
  }

  async update(id: string, data: Partial<LessonPlan>): Promise<LessonPlan> {
    return prisma.lessonPlan.update({ where: { id }, data: data as any }) as unknown as LessonPlan;
  }

  async markItemCompleted(studentId: string, contentId: string, score?: number): Promise<void> {
    await prisma.lessonPlanItem.updateMany({
      where: {
        contentId,
        lessonPlan: { studentId, isActive: true },
      },
      data: {
        isCompleted: true,
        completedAt: new Date(),
        score,
      },
    });
  }
}
