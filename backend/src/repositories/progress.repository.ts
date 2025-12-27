import prisma from '../config/database';
import { Progress, DailyActivity, SkillProgress } from '../models/progress.types';

/**
 * Progress Repository - Database operations for student progress
 */
export class ProgressRepository {
  async findByStudentId(studentId: string): Promise<Progress | null> {
    return prisma.progress.findUnique({ where: { studentId } }) as unknown as Progress | null;
  }

  async findByTeacherId(teacherId: string): Promise<Progress[]> {
    return prisma.progress.findMany({
      where: { student: { teacherId } },
    }) as unknown as Progress[];
  }

  async create(studentId: string): Promise<Progress> {
    return prisma.progress.create({
      data: {
        studentId,
        totalLessonsCompleted: 0,
        totalExercisesCompleted: 0,
        totalTestsTaken: 0,
        averageScore: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalStudyTime: 0,
        lastActivityAt: new Date(),
      },
    }) as unknown as Progress;
  }

  async update(studentId: string, data: Partial<Progress>): Promise<Progress> {
    return prisma.progress.update({
      where: { studentId },
      data: data as any,
    }) as unknown as Progress;
  }

  async getRecentActivity(studentId: string, days: number): Promise<DailyActivity[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return prisma.dailyActivity.findMany({
      where: {
        studentId,
        date: { gte: startDate },
      },
      orderBy: { date: 'desc' },
    }) as unknown as DailyActivity[];
  }

  async recordActivity(studentId: string, activity: Partial<DailyActivity>): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyActivity.upsert({
      where: { studentId_date: { studentId, date: today } },
      create: {
        studentId,
        date: today,
        ...activity,
      } as any,
      update: activity as any,
    });
  }

  async updateStreak(studentId: string): Promise<number> {
    const progress = await this.findByStudentId(studentId);
    if (!progress) return 0;

    const newStreak = progress.currentStreak + 1;
    const longestStreak = Math.max(newStreak, progress.longestStreak);

    await this.update(studentId, {
      currentStreak: newStreak,
      longestStreak,
      lastActivityAt: new Date(),
    });

    return newStreak;
  }

  async getSkillProgress(studentId: string, skill: string): Promise<SkillProgress | null> {
    // TODO: Implement skill progress calculation
    return null;
  }
}
