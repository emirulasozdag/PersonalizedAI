import { Request, Response, NextFunction } from 'express';
import { FeedbackService } from '../services/feedback.service';
import { sendSuccess, sendCreated } from '../utils/response';

export class FeedbackController {
  private feedbackService: FeedbackService;

  constructor() {
    this.feedbackService = new FeedbackService();
  }

  submitFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedback = await this.feedbackService.submitFeedback(req.user!.userId, req.body);
      sendCreated(res, feedback, 'Feedback submitted successfully');
    } catch (error) {
      next(error);
    }
  };

  getMyFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedback = await this.feedbackService.getUserFeedback(req.user!.userId);
      sendSuccess(res, feedback);
    } catch (error) {
      next(error);
    }
  };

  getAllFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string | undefined;
      const feedback = await this.feedbackService.getAllFeedback(status);
      sendSuccess(res, feedback);
    } catch (error) {
      next(error);
    }
  };

  getFeedbackById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedback = await this.feedbackService.getFeedbackById(req.params.feedbackId);
      sendSuccess(res, feedback);
    } catch (error) {
      next(error);
    }
  };

  updateFeedbackStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, adminResponse } = req.body;
      const feedback = await this.feedbackService.updateFeedbackStatus(
        req.params.feedbackId,
        status,
        adminResponse
      );
      sendSuccess(res, feedback, 'Feedback status updated');
    } catch (error) {
      next(error);
    }
  };
}
