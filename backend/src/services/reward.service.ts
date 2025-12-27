import { RewardRepository, StudentRewardRepository } from '../repositories/reward.repository';
import {
  Reward,
  StudentReward,
  StudentRewardsDTO,
  PointTransaction,
} from '../models/reward.types';
import { NotFoundError } from '../middleware/errorHandler';
import { NotificationService } from './external/notification.service';
import { logger } from '../utils/logger';

export class RewardService {
  private rewardRepository: RewardRepository;
  private studentRewardRepository: StudentRewardRepository;
  private notificationService: NotificationService;

  constructor() {
    this.rewardRepository = new RewardRepository();
    this.studentRewardRepository = new StudentRewardRepository();
    this.notificationService = new NotificationService();
  }

  /**
   * Get all available rewards
   */
  async getAvailableRewards(): Promise<Reward[]> {
    return this.rewardRepository.findAllActive();
  }

  /**
   * Get student's rewards summary
   */
  async getStudentRewards(studentId: string): Promise<StudentRewardsDTO> {
    const [rewards, totalPoints, streak, recentPoints] = await Promise.all([
      this.studentRewardRepository.findByStudentId(studentId),
      this.studentRewardRepository.getTotalPoints(studentId),
      this.studentRewardRepository.getCurrentStreak(studentId),
      this.studentRewardRepository.getRecentPointTransactions(studentId, 10),
    ]);

    const badges = await Promise.all(
      rewards.map(async (sr) => {
        const reward = await this.rewardRepository.findById(sr.rewardId);
        return {
          id: reward!.id,
          name: reward!.name,
          description: reward!.description,
          icon: reward!.icon,
          earnedAt: sr.earnedAt,
        };
      })
    );

    const availableRewards = await this.getAvailableRewardsForStudent(studentId);

    return {
      totalPoints,
      currentStreak: streak,
      badges,
      recentPoints,
      availableRewards,
    };
  }

  /**
   * Award a reward to student
   */
  async awardReward(
    studentId: string,
    rewardId: string,
    notify: boolean = true
  ): Promise<StudentReward> {
    const reward = await this.rewardRepository.findById(rewardId);
    if (!reward) {
      throw new NotFoundError('Reward not found');
    }

    // Check if already awarded
    const existing = await this.studentRewardRepository.findByStudentAndReward(
      studentId,
      rewardId
    );
    if (existing) {
      return existing;
    }

    const studentReward = await this.studentRewardRepository.create({
      studentId,
      rewardId,
      earnedAt: new Date(),
      notified: false,
    });

    // Add points
    await this.addPoints(studentId, reward.pointValue, 'reward', rewardId);

    // Send notification
    if (notify) {
      await this.notificationService.sendRewardNotification(
        studentId,
        reward.name,
        reward.pointValue
      );
      await this.studentRewardRepository.markNotified(studentReward.id);
    }

    logger.info(`Reward ${rewardId} awarded to student ${studentId}`);
    return studentReward;
  }

  /**
   * Add points to student
   */
  async addPoints(
    studentId: string,
    points: number,
    sourceType: string,
    sourceId?: string
  ): Promise<void> {
    await this.studentRewardRepository.addPointTransaction({
      studentId,
      points,
      reason: `Earned from ${sourceType}`,
      sourceType: sourceType as any,
      sourceId,
      createdAt: new Date(),
    });

    logger.info(`${points} points added to student ${studentId}`);
  }

  /**
   * Check and award rewards based on criteria
   */
  async checkAndAwardRewards(studentId: string): Promise<Reward[]> {
    const availableRewards = await this.rewardRepository.findAllActive();
    const earnedRewards: Reward[] = [];

    for (const reward of availableRewards) {
      const isEligible = await this.checkRewardEligibility(studentId, reward);
      if (isEligible) {
        await this.awardReward(studentId, reward.id);
        earnedRewards.push(reward);
      }
    }

    return earnedRewards;
  }

  /**
   * Check if student is eligible for a reward
   */
  private async checkRewardEligibility(
    studentId: string,
    reward: Reward
  ): Promise<boolean> {
    // Check if already has the reward
    const existing = await this.studentRewardRepository.findByStudentAndReward(
      studentId,
      reward.id
    );
    if (existing) return false;

    // Check criteria based on type
    const criteria = reward.criteria;
    switch (criteria.type) {
      case 'streak':
        const streak = await this.studentRewardRepository.getCurrentStreak(studentId);
        return streak >= criteria.threshold;
      case 'lessons_completed':
        // TODO: Check lessons completed
        return false;
      case 'tests_passed':
        // TODO: Check tests passed
        return false;
      default:
        return false;
    }
  }

  /**
   * Get rewards student can still earn
   */
  private async getAvailableRewardsForStudent(
    studentId: string
  ): Promise<Reward[]> {
    const allRewards = await this.rewardRepository.findAllActive();
    const earnedRewards = await this.studentRewardRepository.findByStudentId(studentId);
    const earnedIds = new Set(earnedRewards.map((r) => r.rewardId));

    return allRewards.filter((r) => !earnedIds.has(r.id));
  }
}
