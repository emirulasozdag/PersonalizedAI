// =============================================================================
// Progress Types - Student progress tracking and analytics
// =============================================================================

import { LanguageLevel } from './enums';

export interface Progress {
  id: string;
  studentId: string;
  totalLessonsCompleted: number;
  totalExercisesCompleted: number;
  totalTestsTaken: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number; // in minutes
  lastActivityAt: Date;
  levelHistory: LevelChange[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressSnapshot {
  id: string;
  progressId: string;
  date: Date;
  lessonsCompleted: number;
  exercisesCompleted: number;
  studyTimeMinutes: number;
  averageScore: number;
  readingLevel: LanguageLevel;
  writingLevel: LanguageLevel;
  listeningLevel: LanguageLevel;
  speakingLevel: LanguageLevel;
}

export interface LevelChange {
  skill: 'reading' | 'writing' | 'listening' | 'speaking' | 'overall';
  previousLevel: LanguageLevel;
  newLevel: LanguageLevel;
  changedAt: Date;
  reason: string;
}

export interface SkillProgress {
  skill: 'reading' | 'writing' | 'listening' | 'speaking';
  currentLevel: LanguageLevel;
  progressPercentage: number; // Progress towards next level
  strengths: string[];
  weaknesses: string[];
  recommendedTopics: string[];
}

export interface DailyActivity {
  date: Date;
  lessonsCompleted: number;
  exercisesCompleted: number;
  testsCompleted: number;
  studyTimeMinutes: number;
  pointsEarned: number;
}

// DTOs
export interface ProgressSummaryDTO {
  studentId: string;
  overallLevel: LanguageLevel;
  skillLevels: {
    reading: LanguageLevel;
    writing: LanguageLevel;
    listening: LanguageLevel;
    speaking: LanguageLevel;
  };
  statistics: {
    totalLessons: number;
    totalExercises: number;
    totalTests: number;
    averageScore: number;
    studyTimeHours: number;
  };
  streak: {
    current: number;
    longest: number;
  };
  recentActivity: DailyActivity[];
}

export interface ExportProgressDTO {
  format: 'pdf' | 'csv';
  dateRange?: {
    start: Date;
    end: Date;
  };
  includeDetails: boolean;
}
