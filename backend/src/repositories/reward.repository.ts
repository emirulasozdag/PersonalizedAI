import prisma from '../config/database';
import { Reward, StudentReward, PointTransaction } from '../models/reward.types';

/**
 * Reward Repository - Database operations for rewards
 */
export class RewardRepository {
  async findById(id: string): Promise<Reward | null> {
    return prisma.reward.findUnique({ where: { id } }) as unknown as Reward | null;
  }

  async findAllActive(): Promise<Reward[]> {
    return prisma.reward.findMany({
      where: { isActive: true },
      orderBy: { pointValue: 'desc' },
    }) as unknown as Reward[];
  }

  async create(data: Partial<Reward>): Promise<Reward> {
    return prisma.reward.create({ data: data as any }) as unknown as Reward;
  }
}

/**
 * Student Reward Repository
 */
export class StudentRewardRepository {
  async findById(id: string): Promise<StudentReward | null> {
    return prisma.studentReward.findUnique({ where: { id } }) as unknown as StudentReward | null;
  }

  async findByStudentId(studentId: string): Promise<StudentReward[]> {
    return prisma.studentReward.findMany({
      where: { studentId },
      include: { reward: true },
      orderBy: { earnedAt: 'desc' },
    }) as unknown as StudentReward[];
  }

  async findByStudentAndReward(studentId: string, rewardId: string): Promise<StudentReward | null> {
    return prisma.studentReward.findUnique({
      where: { studentId_rewardId: { studentId, rewardId } },
    }) as unknown as StudentReward | null;
  }

  async create(data: Partial<StudentReward>): Promise<StudentReward> {
    return prisma.studentReward.create({ data: data as any }) as unknown as StudentReward;
  }

  async markNotified(id: string): Promise<void> {
    await prisma.studentReward.update({
      where: { id },
      data: { notified: true },
    });
  }

  async getTotalPoints(studentId: string): Promise<number> {
    const result = await prisma.pointTransaction.aggregate({
      where: { studentId },
      _sum: { points: true },
    });
    return result._sum.points || 0;
  }

  async getCurrentStreak(studentId: string): Promise<number> {
    const user = await prisma.user.findUnique({
      where: { id: studentId },
      select: { dailyStreak: true },
    });
    return user?.dailyStreak || 0;
  }

  async getRecentPointTransactions(studentId: string, limit: number): Promise<PointTransaction[]> {
    return prisma.pointTransaction.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    }) as unknown as PointTransaction[];
  }

  async addPointTransaction(data: Partial<PointTransaction>): Promise<void> {
    await prisma.pointTransaction.create({ data: data as any });
    await prisma.user.update({
      where: { id: data.studentId },
      data: { totalPoints: { increment: data.points } },
    });
  }
}
