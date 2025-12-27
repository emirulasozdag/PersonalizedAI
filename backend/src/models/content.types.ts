// =============================================================================
// Content Types - Lessons, exercises, and learning materials
// =============================================================================

import { ContentType, LanguageLevel } from './enums';

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  level: LanguageLevel;
  topicId: string;
  content: string; // JSON or HTML content
  duration: number; // estimated minutes
  order: number;
  isAiGenerated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  category: 'grammar' | 'vocabulary' | 'pronunciation' | 'speaking' | 'listening' | 'reading' | 'writing';
  level: LanguageLevel;
  order: number;
  parentTopicId?: string;
}

export interface Exercise {
  id: string;
  contentId: string;
  type: 'fill_blank' | 'multiple_choice' | 'matching' | 'ordering' | 'free_text' | 'audio_response';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hints?: string[];
  points: number;
}

export interface LessonPlan {
  id: string;
  studentId: string;
  title: string;
  description: string;
  level: LanguageLevel;
  topics: Topic[];
  contents: Content[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  aiRationale: string; // Why this plan was generated
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonPlanItem {
  id: string;
  lessonPlanId: string;
  contentId: string;
  order: number;
  isCompleted: boolean;
  completedAt?: Date;
  score?: number;
}

// DTOs
export interface GenerateContentDTO {
  studentId: string;
  topicId: string;
  level: LanguageLevel;
  type: ContentType;
  teacherInstructions?: string;
}

export interface ContentUpdateDTO {
  title?: string;
  description?: string;
  content?: string;
  level?: LanguageLevel;
}

export interface LessonPlanGenerationDTO {
  studentId: string;
  focusAreas: string[];
  duration: number; // weeks
  intensity: 'light' | 'moderate' | 'intensive';
}
