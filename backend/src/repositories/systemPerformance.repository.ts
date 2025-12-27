import { v4 as uuidv4 } from 'uuid';
import { SystemPerformance } from '../models/admin.types';

export class SystemPerformanceRepository {
  /**
   * TODO: Replace with real persistence (e.g., Prisma + DB table).
   */
  async getLatest(): Promise<SystemPerformance | null> {
    return {
      id: uuidv4(),
      timestamp: new Date(),
      cpuUsage: 0,
      memoryUsage: 0,
      activeUsers: 0,
      requestsPerMinute: 0,
      averageResponseTime: 0,
      errorRate: 0,
    };
  }

  /**
   * TODO: Replace with real aggregation queries.
   */
  async getMetrics(period: 'hour' | 'day' | 'week'): Promise<SystemPerformance[]> {
    // Keep parameter used to avoid lint/ts unused warnings if enabled.
    void period;

    const latest = await this.getLatest();
    return latest ? [latest] : [];
  }
}
