import { v4 as uuidv4 } from 'uuid';
import { MaintenanceLog, SystemLog } from '../models/admin.types';

export type FindLogsParams = {
  level?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
};

export class SystemLogRepository {
  private readonly logs: SystemLog[] = [];
  private readonly maintenanceLogs = new Map<string, MaintenanceLog>();

  /**
   * TODO: Persist system logs (e.g., Prisma model).
   */
  async create(
    entry: Omit<SystemLog, 'id'> & {
      id?: string;
    }
  ): Promise<SystemLog> {
    const log: SystemLog = {
      id: entry.id ?? uuidv4(),
      level: entry.level,
      message: entry.message,
      metadata: entry.metadata,
      source: entry.source,
      timestamp: entry.timestamp,
    };

    this.logs.push(log);
    return log;
  }

  /**
   * TODO: Query logs from DB with proper indexing.
   */
  async findLogs(params: FindLogsParams): Promise<SystemLog[]> {
    const limit = params.limit ?? 100;

    return this.logs
      .filter((log) => {
        if (params.level && log.level !== params.level) return false;
        if (params.startDate && log.timestamp < params.startDate) return false;
        if (params.endDate && log.timestamp > params.endDate) return false;
        return true;
      })
      .slice(-limit)
      .reverse();
  }

  /**
   * TODO: Persist maintenance logs (e.g., Prisma model).
   */
  async createMaintenanceLog(data: Omit<MaintenanceLog, 'id'>): Promise<MaintenanceLog> {
    const log: MaintenanceLog = {
      id: uuidv4(),
      ...data,
    };

    this.maintenanceLogs.set(log.id, log);
    return log;
  }

  /**
   * TODO: Persist updates and validate state transitions.
   */
  async updateMaintenanceLog(
    maintenanceId: string,
    updates: Partial<MaintenanceLog>
  ): Promise<MaintenanceLog> {
    const existing = this.maintenanceLogs.get(maintenanceId);

    const updated: MaintenanceLog = {
      id: maintenanceId,
      adminId: existing?.adminId ?? 'TODO-admin-id',
      type: existing?.type ?? 'scheduled',
      title: existing?.title ?? 'Maintenance',
      description: existing?.description ?? 'TODO: persisted maintenance description',
      startedAt: existing?.startedAt ?? new Date(),
      status: existing?.status ?? 'in_progress',
      affectedServices: existing?.affectedServices ?? ['all'],
      ...existing,
      ...updates,
    };

    this.maintenanceLogs.set(maintenanceId, updated);
    return updated;
  }
}
