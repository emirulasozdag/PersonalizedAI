import { Request, Response, NextFunction } from 'express';
import { RewardService } from '../services/reward.service';
import { sendSuccess } from '../utils/response';

export class RewardController {
  private rewardService: RewardService;

  constructor() {
    this.rewardService = new RewardService();
  }

  getMyRewards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rewards = await this.rewardService.getStudentRewards(req.user!.userId);
      sendSuccess(res, rewards);
    } catch (error) {
      next(error);
    }
  };

  getAvailableRewards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rewards = await this.rewardService.getAvailableRewards();
      sendSuccess(res, rewards);
    } catch (error) {
      next(error);
    }
  };

  checkRewards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const earned = await this.rewardService.checkAndAwardRewards(req.user!.userId);
      sendSuccess(res, earned, earned.length > 0 ? 'New rewards earned!' : 'No new rewards');
    } catch (error) {
      next(error);
    }
  };

  getStudentRewards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rewards = await this.rewardService.getStudentRewards(req.params.studentId);
      sendSuccess(res, rewards);
    } catch (error) {
      next(error);
    }
  };
}
