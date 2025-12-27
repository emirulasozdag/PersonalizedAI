import { UserRepository } from '../repositories/user.repository';
import { SystemPerformanceRepository } from '../repositories/systemPerformance.repository';
import { SystemLogRepository } from '../repositories/systemLog.repository';

import {
  SystemStatsDTO,
  MaintenanceModeDTO,
  MaintenanceLog,
  UpdateUserRoleDTO,
} from '../models/admin.types';
import { UserRole } from '../models/enums';
import { NotFoundError, BadRequestError } from '../middleware/errorHandler';
import { NotificationService } from './external/notification.service';
import { logger } from '../utils/logger';

export class AdminService {
  private userRepository: UserRepository;
  private performanceRepository: SystemPerformanceRepository;
  private logRepository: SystemLogRepository;
  private notificationService: NotificationService;

  constructor() {
    this.userRepository = new UserRepository();
    this.performanceRepository = new SystemPerformanceRepository();
    this.logRepository = new SystemLogRepository();
    this.notificationService = new NotificationService();
  }

  /**
   * Get system statistics
   */
  async getSystemStats(): Promise<SystemStatsDTO> {
    const [userStats, contentStats, testStats, performance] = await Promise.all([
      this.getUserStats(),
      this.getContentStats(),
      this.getTestStats(),
      this.performanceRepository.getLatest(),
    ]);

    return {
      users: userStats,
      content: contentStats,
      tests: testStats,
      performance: performance!,
    };
  }

  /**
   * Get all users with pagination
   */
  async getAllUsers(
    page: number = 1,
    limit: number = 20,
    role?: UserRole
  ): Promise<{ users: any[]; total: number }> {
    return this.userRepository.findAll(page, limit, role);
  }

  /**
   * Update user role
   */
  async updateUserRole(
    adminId: string,
    data: UpdateUserRoleDTO
  ): Promise<void> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const previousRole = user.role;
    await this.userRepository.update(data.userId, { role: data.newRole as UserRole });

    // Log the action
    await this.logRepository.create({
      level: 'info',
      message: `User role changed from ${previousRole} to ${data.newRole}`,
      metadata: {
        adminId,
        userId: data.userId,
        reason: data.reason,
      },
      source: 'AdminService',
      timestamp: new Date(),
    });

    logger.info(`User ${data.userId} role changed to ${data.newRole} by admin ${adminId}`);
  }

  /**
   * Deactivate user account
   */
  async deactivateUser(adminId: string, userId: string, reason: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    await this.userRepository.update(userId, { isActive: false });

    await this.logRepository.create({
      level: 'warn',
      message: `User account deactivated`,
      metadata: { adminId, userId, reason },
      source: 'AdminService',
      timestamp: new Date(),
    });

    logger.warn(`User ${userId} deactivated by admin ${adminId}`);
  }

  /**
   * Reactivate user account
   */
  async reactivateUser(adminId: string, userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    await this.userRepository.update(userId, { isActive: true });
    logger.info(`User ${userId} reactivated by admin ${adminId}`);
  }

  /**
   * Enable maintenance mode
   */
  async enableMaintenanceMode(
    adminId: string,
    data: MaintenanceModeDTO
  ): Promise<MaintenanceLog> {
    if (!data.enable) {
      throw new BadRequestError('Use disableMaintenanceMode to disable');
    }

    const log = await this.logRepository.createMaintenanceLog({
      adminId,
      type: 'scheduled',
      title: data.title,
      description: data.description,
      startedAt: new Date(),
      status: 'in_progress',
      affectedServices: data.affectedServices || ['all'],
    });

    // Notify all users
    await this.notificationService.sendMaintenanceNotification(
      data.title,
      data.description,
      data.estimatedDuration
    );

    logger.warn(`Maintenance mode enabled by admin ${adminId}`);
    return log;
  }

  /**
   * Disable maintenance mode
   */
  async disableMaintenanceMode(
    adminId: string,
    maintenanceId: string
  ): Promise<void> {
    await this.logRepository.updateMaintenanceLog(maintenanceId, {
      status: 'completed',
      endedAt: new Date(),
    });

    await this.notificationService.sendMaintenanceEndNotification();
    logger.info(`Maintenance mode disabled by admin ${adminId}`);
  }

  /**
   * Get system logs
   */
  async getSystemLogs(
    level?: string,
    startDate?: Date,
    endDate?: Date,
    limit: number = 100
  ): Promise<any[]> {
    return this.logRepository.findLogs({ level, startDate, endDate, limit });
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(
    period: 'hour' | 'day' | 'week'
  ): Promise<any[]> {
    return this.performanceRepository.getMetrics(period);
  }

  // Private helper methods
  private async getUserStats(): Promise<SystemStatsDTO['users']> {
    const stats = await this.userRepository.getStats();
    return {
      total: stats.total,
      students: stats.students,
      teachers: stats.teachers,
      admins: stats.admins,
      activeToday: stats.activeToday,
      newThisWeek: stats.newThisWeek,
    };
  }

  private async getContentStats(): Promise<SystemStatsDTO['content']> {
    // TODO: Implement content stats
    return {
      totalLessons: 0,
      totalExercises: 0,
      aiGeneratedContent: 0,
    };
  }

  private async getTestStats(): Promise<SystemStatsDTO['tests']> {
    // TODO: Implement test stats
    return {
      totalTaken: 0,
      averageScore: 0,
      completionRate: 0,
    };
  }
}
