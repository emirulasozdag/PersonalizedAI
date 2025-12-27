import { Request, Response, NextFunction } from 'express';
import { ProgressTrackingService, GraphService } from '../services/progress.service';
import { sendSuccess } from '../utils/response';

export class ProgressController {
  private progressService: ProgressTrackingService;
  private graphService: GraphService;

  constructor() {
    this.progressService = new ProgressTrackingService();
    this.graphService = new GraphService();
  }

  getMyProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const progress = await this.progressService.getProgressSummary(req.user!.userId);
      sendSuccess(res, progress);
    } catch (error) {
      next(error);
    }
  };

  getSkillProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skill = req.params.skill as 'reading' | 'writing' | 'listening' | 'speaking';
      const progress = await this.progressService.getSkillProgress(req.user!.userId, skill);
      sendSuccess(res, progress);
    } catch (error) {
      next(error);
    }
  };

  getChartData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chartType = req.params.type as 'weekly' | 'monthly' | 'skills';
      const data = await this.graphService.getChartData(req.user!.userId, chartType);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  exportProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const buffer = await this.progressService.exportProgress(req.user!.userId, req.body);
      
      const contentType = req.body.format === 'pdf' 
        ? 'application/pdf' 
        : 'text/csv';
      const filename = `progress_report.${req.body.format}`;

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };

  getStudentProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const progress = await this.progressService.getStudentProgressForTeacher(
        req.user!.userId,
        req.params.studentId
      );
      sendSuccess(res, progress);
    } catch (error) {
      next(error);
    }
  };

  getAllStudentsProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const progress = await this.progressService.getAllStudentsProgress(req.user!.userId);
      sendSuccess(res, progress);
    } catch (error) {
      next(error);
    }
  };
}
