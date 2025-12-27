import { ProgressRepository } from '../repositories/progress.repository';
import { 
  Progress, 
  ProgressSummaryDTO, 
  SkillProgress,
  DailyActivity,
  ExportProgressDTO 
} from '../models/progress.types';
import { LanguageLevel } from '../models/enums';
import { NotFoundError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export class ProgressTrackingService {
  private progressRepository: ProgressRepository;

  constructor() {
    this.progressRepository = new ProgressRepository();
  }

  /**
   * Get student progress summary
   */
  async getProgressSummary(studentId: string): Promise<ProgressSummaryDTO> {
    const progress = await this.progressRepository.findByStudentId(studentId);
    if (!progress) {
      throw new NotFoundError('Progress data not found');
    }

    const recentActivity = await this.progressRepository.getRecentActivity(
      studentId,
      7
    );

    return this.toProgressSummary(progress, recentActivity);
  }

  /**
   * Get skill-specific progress
   */
  async getSkillProgress(
    studentId: string,
    skill: 'reading' | 'writing' | 'listening' | 'speaking'
  ): Promise<SkillProgress> {
    const progress = await this.progressRepository.getSkillProgress(
      studentId,
      skill
    );
    if (!progress) {
      throw new NotFoundError('Skill progress not found');
    }
    return progress;
  }

  /**
   * Record daily activity
   */
  async recordActivity(
    studentId: string,
    activity: Partial<DailyActivity>
  ): Promise<void> {
    await this.progressRepository.recordActivity(studentId, activity);
  }

  /**
   * Update streak
   */
  async updateStreak(studentId: string): Promise<number> {
    const progress = await this.progressRepository.findByStudentId(studentId);
    if (!progress) {
      throw new NotFoundError('Progress not found');
    }

    const newStreak = await this.progressRepository.updateStreak(studentId);
    logger.info(`Streak updated for student ${studentId}: ${newStreak}`);
    return newStreak;
  }

  /**
   * Export progress data
   */
  async exportProgress(
    studentId: string,
    options: ExportProgressDTO
  ): Promise<Buffer> {
    const progress = await this.getProgressSummary(studentId);
    
    if (options.format === 'csv') {
      return this.generateCSV(progress);
    } else {
      return this.generatePDF(progress);
    }
  }

  /**
   * Get progress for teacher view
   */
  async getStudentProgressForTeacher(
    teacherId: string,
    studentId: string
  ): Promise<ProgressSummaryDTO> {
    // TODO: Verify teacher has access to student
    return this.getProgressSummary(studentId);
  }

  /**
   * Get all students progress for teacher
   */
  async getAllStudentsProgress(
    teacherId: string
  ): Promise<ProgressSummaryDTO[]> {
    const studentsProgress = await this.progressRepository.findByTeacherId(teacherId);
    return studentsProgress.map((p) => 
      this.toProgressSummary(p, [])
    );
  }

  private toProgressSummary(
    progress: Progress,
    recentActivity: DailyActivity[]
  ): ProgressSummaryDTO {
    return {
      studentId: progress.studentId,
      overallLevel: LanguageLevel.B1, // TODO: Calculate from skill levels
      skillLevels: {
        reading: LanguageLevel.B1,
        writing: LanguageLevel.A2,
        listening: LanguageLevel.B1,
        speaking: LanguageLevel.A2,
      },
      statistics: {
        totalLessons: progress.totalLessonsCompleted,
        totalExercises: progress.totalExercisesCompleted,
        totalTests: progress.totalTestsTaken,
        averageScore: progress.averageScore,
        studyTimeHours: Math.round(progress.totalStudyTime / 60),
      },
      streak: {
        current: progress.currentStreak,
        longest: progress.longestStreak,
      },
      recentActivity,
    };
  }

  private generateCSV(progress: ProgressSummaryDTO): Buffer {
    // TODO: Implement CSV generation
    const csv = 'Date,Activity,Score\n';
    return Buffer.from(csv, 'utf-8');
  }

  private generatePDF(progress: ProgressSummaryDTO): Buffer {
    // TODO: Implement PDF generation
    return Buffer.from('PDF content', 'utf-8');
  }
}

export class GraphService {
  private progressRepository: ProgressRepository;

  constructor() {
    this.progressRepository = new ProgressRepository();
  }

  /**
   * Get data for progress charts
   */
  async getChartData(
    studentId: string,
    chartType: 'weekly' | 'monthly' | 'skills'
  ): Promise<any> {
    switch (chartType) {
      case 'weekly':
        return this.getWeeklyChartData(studentId);
      case 'monthly':
        return this.getMonthlyChartData(studentId);
      case 'skills':
        return this.getSkillsChartData(studentId);
      default:
        return {};
    }
  }

  private async getWeeklyChartData(studentId: string): Promise<any> {
    const activity = await this.progressRepository.getRecentActivity(studentId, 7);
    return {
      labels: activity.map(a => a.date.toISOString().split('T')[0]),
      datasets: [
        {
          label: 'Study Time (minutes)',
          data: activity.map(a => a.studyTimeMinutes),
        },
        {
          label: 'Lessons Completed',
          data: activity.map(a => a.lessonsCompleted),
        },
      ],
    };
  }

  private async getMonthlyChartData(studentId: string): Promise<any> {
    // TODO: Implement monthly chart data
    return {};
  }

  private async getSkillsChartData(studentId: string): Promise<any> {
    // TODO: Implement skills radar chart data
    return {};
  }
}
