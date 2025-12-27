import { FeedbackRepository } from '../repositories/feedback.repository';
import { Feedback, SubmitFeedbackDTO } from '../models/communication.types';
import { NotFoundError, ForbiddenError } from '../middleware/errorHandler';
import { NotificationService } from './external/notification.service';
import { logger } from '../utils/logger';

export class FeedbackService {
  private feedbackRepository: FeedbackRepository;
  private notificationService: NotificationService;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
    this.notificationService = new NotificationService();
  }

  /**
   * Submit feedback
   */
  async submitFeedback(
    userId: string,
    data: SubmitFeedbackDTO
  ): Promise<Feedback> {
    const feedback = await this.feedbackRepository.create({
      userId,
      type: data.type,
      subject: data.subject,
      description: data.description,
      status: 'pending',
    });

    // Notify admins
    await this.notificationService.notifyAdminsOfFeedback(feedback.id);

    logger.info(`Feedback submitted: ${feedback.id} by user ${userId}`);
    return feedback;
  }

  /**
   * Get user's feedback submissions
   */
  async getUserFeedback(userId: string): Promise<Feedback[]> {
    return this.feedbackRepository.findByUserId(userId);
  }

  /**
   * Get all feedback (admin)
   */
  async getAllFeedback(status?: string): Promise<Feedback[]> {
    return this.feedbackRepository.findAll(status);
  }

  /**
   * Get feedback by ID
   */
  async getFeedbackById(feedbackId: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findById(feedbackId);
    if (!feedback) {
      throw new NotFoundError('Feedback not found');
    }
    return feedback;
  }

  /**
   * Update feedback status (admin)
   */
  async updateFeedbackStatus(
    feedbackId: string,
    status: 'reviewed' | 'resolved',
    adminResponse?: string
  ): Promise<Feedback> {
    const feedback = await this.getFeedbackById(feedbackId);

    const updated = await this.feedbackRepository.update(feedbackId, {
      status,
      adminResponse,
    });

    // Notify user if resolved
    if (status === 'resolved') {
      await this.notificationService.notifyFeedbackResolved(
        feedback.userId,
        feedbackId
      );
    }

    logger.info(`Feedback ${feedbackId} status updated to ${status}`);
    return updated;
  }
}

export class AutomaticFeedbackService {
  /**
   * Generate automatic feedback based on test results
   */
  async generateFeedback(
    testResultId: string
  ): Promise<{ question: string; feedback: string }[]> {
    // TODO: Implement AI-based feedback generation
    return [];
  }

  /**
   * Generate feedback for writing submission
   */
  async generateWritingFeedback(
    submission: string
  ): Promise<{
    grammar: string[];
    vocabulary: string[];
    structure: string[];
    overall: string;
  }> {
    // TODO: Implement AI-based writing feedback
    return {
      grammar: [],
      vocabulary: [],
      structure: [],
      overall: '',
    };
  }
}
