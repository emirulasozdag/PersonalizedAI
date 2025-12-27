import { Request, Response, NextFunction } from 'express';
import { 
  ContentDeliveryService, 
  ContentGenerationService,
  StudentAnalysisService 
} from '../services/content.service';
import { sendSuccess, sendCreated } from '../utils/response';
import { LanguageLevel } from '../models/enums';

export class ContentController {
  private contentDeliveryService: ContentDeliveryService;
  private contentGenerationService: ContentGenerationService;
  private studentAnalysisService: StudentAnalysisService;

  constructor() {
    this.contentDeliveryService = new ContentDeliveryService();
    this.contentGenerationService = new ContentGenerationService();
    this.studentAnalysisService = new StudentAnalysisService();
  }

  getTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const level = req.query.level as LanguageLevel | undefined;
      const topics = await this.contentDeliveryService.getTopics(level);
      sendSuccess(res, topics);
    } catch (error) {
      next(error);
    }
  };

  getMyLessonPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plan = await this.contentDeliveryService.getStudentLessonPlan(req.user!.userId);
      sendSuccess(res, plan);
    } catch (error) {
      next(error);
    }
  };

  getContentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const content = await this.contentDeliveryService.getContentById(req.params.contentId);
      sendSuccess(res, content);
    } catch (error) {
      next(error);
    }
  };

  getContentByLevel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const level = req.params.level as LanguageLevel;
      const content = await this.contentDeliveryService.getContentForLevel(level);
      sendSuccess(res, content);
    } catch (error) {
      next(error);
    }
  };

  generateContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const content = await this.contentGenerationService.generateContent(req.body);
      sendCreated(res, content, 'Content generated successfully');
    } catch (error) {
      next(error);
    }
  };

  updateContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const content = await this.contentGenerationService.updateContent(
        req.params.contentId,
        req.body
      );
      sendSuccess(res, content, 'Content updated successfully');
    } catch (error) {
      next(error);
    }
  };

  completeContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { score } = req.body;
      await this.contentDeliveryService.markContentCompleted(
        req.user!.userId,
        req.params.contentId,
        score
      );
      sendSuccess(res, null, 'Content marked as completed');
    } catch (error) {
      next(error);
    }
  };

  generateLessonPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plan = await this.studentAnalysisService.generateLessonPlan(req.body);
      sendCreated(res, plan, 'Lesson plan generated successfully');
    } catch (error) {
      next(error);
    }
  };
}
