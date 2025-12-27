import { Request, Response, NextFunction } from 'express';
import { AssignmentService } from '../services/assignment.service';
import { sendSuccess, sendCreated } from '../utils/response';

export class AssignmentController {
  private assignmentService: AssignmentService;

  constructor() {
    this.assignmentService = new AssignmentService();
  }

  createAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assignment = await this.assignmentService.createAssignment(
        req.user!.userId,
        req.body
      );
      sendCreated(res, assignment, 'Assignment created successfully');
    } catch (error) {
      next(error);
    }
  };

  getTeacherAssignments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assignments = await this.assignmentService.getTeacherAssignments(req.user!.userId);
      sendSuccess(res, assignments);
    } catch (error) {
      next(error);
    }
  };

  getStudentAssignments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as any;
      const assignments = await this.assignmentService.getStudentAssignments(
        req.user!.userId,
        status
      );
      sendSuccess(res, assignments);
    } catch (error) {
      next(error);
    }
  };

  getAssignmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assignment = await this.assignmentService.getAssignmentById(req.params.assignmentId);
      sendSuccess(res, assignment);
    } catch (error) {
      next(error);
    }
  };

  submitAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.assignmentService.submitAssignment(req.user!.userId, req.body);
      sendSuccess(res, result, 'Assignment submitted successfully');
    } catch (error) {
      next(error);
    }
  };

  gradeAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.assignmentService.gradeAssignment(
        req.user!.userId,
        req.params.studentAssignmentId,
        req.body
      );
      sendSuccess(res, result, 'Assignment graded successfully');
    } catch (error) {
      next(error);
    }
  };
}
