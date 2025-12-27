import { Request, Response, NextFunction } from 'express';
import { PlacementTestService } from '../services/test.service';
import { sendSuccess } from '../utils/response';

export class TestController {
  private testService: PlacementTestService;

  constructor() {
    this.testService = new PlacementTestService();
  }

  getPlacementTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const test = await this.testService.getPlacementTest(req.user!.userId);
      sendSuccess(res, test);
    } catch (error) {
      next(error);
    }
  };

  getTestById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const test = await this.testService.getTestById(req.params.testId);
      sendSuccess(res, test);
    } catch (error) {
      next(error);
    }
  };

  submitTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.testService.submitTest(req.user!.userId, req.body);
      sendSuccess(res, result, 'Test submitted successfully');
    } catch (error) {
      next(error);
    }
  };

  submitSpeakingTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { testId, audioUrl } = req.body;
      const result = await this.testService.submitSpeakingTest(
        req.user!.userId,
        testId,
        audioUrl
      );
      sendSuccess(res, result, 'Speaking test submitted successfully');
    } catch (error) {
      next(error);
    }
  };

  getMyResults = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await this.testService.getStudentResults(req.user!.userId);
      sendSuccess(res, results);
    } catch (error) {
      next(error);
    }
  };

  getResultById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.testService.getResultById(req.params.resultId);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getStudentResults = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await this.testService.getStudentResults(req.params.studentId);
      sendSuccess(res, results);
    } catch (error) {
      next(error);
    }
  };
}
