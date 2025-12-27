import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';
import { sendSuccess, sendPaginated, calculatePagination } from '../utils/response';

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  getSystemStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.adminService.getSystemStats();
      sendSuccess(res, stats);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const role = req.query.role as any;

      const { users, total } = await this.adminService.getAllUsers(page, limit, role);
      const pagination = calculatePagination(page, limit, total);
      sendPaginated(res, users, pagination);
    } catch (error) {
      next(error);
    }
  };

  updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.adminService.updateUserRole(req.user!.userId, {
        userId: req.params.userId,
        newRole: req.body.role,
        reason: req.body.reason,
      });
      sendSuccess(res, null, 'User role updated successfully');
    } catch (error) {
      next(error);
    }
  };

  deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.adminService.deactivateUser(
        req.user!.userId,
        req.params.userId,
        req.body.reason
      );
      sendSuccess(res, null, 'User deactivated successfully');
    } catch (error) {
      next(error);
    }
  };

  reactivateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.adminService.reactivateUser(req.user!.userId, req.params.userId);
      sendSuccess(res, null, 'User reactivated successfully');
    } catch (error) {
      next(error);
    }
  };

  enableMaintenanceMode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const log = await this.adminService.enableMaintenanceMode(req.user!.userId, req.body);
      sendSuccess(res, log, 'Maintenance mode enabled');
    } catch (error) {
      next(error);
    }
  };

  disableMaintenanceMode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.adminService.disableMaintenanceMode(
        req.user!.userId,
        req.params.maintenanceId
      );
      sendSuccess(res, null, 'Maintenance mode disabled');
    } catch (error) {
      next(error);
    }
  };

  getSystemLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { level, startDate, endDate, limit } = req.query;
      const logs = await this.adminService.getSystemLogs(
        level as string,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined,
        limit ? parseInt(limit as string) : undefined
      );
      sendSuccess(res, logs);
    } catch (error) {
      next(error);
    }
  };

  getPerformanceMetrics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const period = (req.query.period as 'hour' | 'day' | 'week') || 'day';
      const metrics = await this.adminService.getPerformanceMetrics(period);
      sendSuccess(res, metrics);
    } catch (error) {
      next(error);
    }
  };
}
