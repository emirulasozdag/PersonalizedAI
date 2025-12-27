// =============================================================================
// Admin Types - System management and maintenance
// =============================================================================

export interface SystemPerformance {
  id: string;
  timestamp: Date;
  cpuUsage: number;
  memoryUsage: number;
  activeUsers: number;
  requestsPerMinute: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface MaintenanceLog {
  id: string;
  adminId: string;
  type: 'scheduled' | 'emergency' | 'update';
  title: string;
  description: string;
  startedAt: Date;
  endedAt?: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  affectedServices: string[];
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  metadata?: Record<string, any>;
  source: string;
  timestamp: Date;
}

export interface UserAccountAction {
  id: string;
  adminId: string;
  targetUserId: string;
  action: 'create' | 'update' | 'deactivate' | 'reactivate' | 'delete' | 'role_change';
  previousValue?: string;
  newValue?: string;
  reason?: string;
  createdAt: Date;
}

// DTOs
export interface SystemStatsDTO {
  users: {
    total: number;
    students: number;
    teachers: number;
    admins: number;
    activeToday: number;
    newThisWeek: number;
  };
  content: {
    totalLessons: number;
    totalExercises: number;
    aiGeneratedContent: number;
  };
  tests: {
    totalTaken: number;
    averageScore: number;
    completionRate: number;
  };
  performance: SystemPerformance;
}

export interface MaintenanceModeDTO {
  enable: boolean;
  title: string;
  description: string;
  estimatedDuration: number; // minutes
  affectedServices?: string[];
}

export interface UpdateUserRoleDTO {
  userId: string;
  newRole: string;
  reason: string;
}
