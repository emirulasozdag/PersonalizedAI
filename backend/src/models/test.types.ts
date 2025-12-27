// =============================================================================
// Test Types - Placement tests, modules, and results
// =============================================================================

import { TestType, LanguageLevel } from './enums';

export interface Test {
  id: string;
  type: TestType;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestModule {
  id: string;
  testId: string;
  type: TestType;
  title: string;
  order: number;
  questions: Question[];
}

export interface Question {
  id: string;
  moduleId: string;
  content: string;
  type: 'multiple_choice' | 'text_input' | 'audio_response' | 'written_response';
  options?: string[];
  correctAnswer?: string;
  points: number;
  audioUrl?: string;
  imageUrl?: string;
  order: number;
}

// Specific test types
export interface PlacementTest extends Test {
  type: TestType.PLACEMENT;
  modules: {
    reading: TestModule;
    writing: TestModule;
    listening: TestModule;
    speaking: TestModule;
  };
}

export interface ReadingTest extends Test {
  type: TestType.READING;
  passages: string[];
}

export interface WritingTest extends Test {
  type: TestType.WRITING;
  prompts: string[];
  minWordCount: number;
  maxWordCount: number;
}

export interface ListeningTest extends Test {
  type: TestType.LISTENING;
  audioUrls: string[];
}

export interface SpeakingTest extends Test {
  type: TestType.SPEAKING;
  prompts: string[];
  recordingDuration: number; // seconds per prompt
}

// Results
export interface TestResult {
  id: string;
  testId: string;
  studentId: string;
  type: TestType;
  score: number;
  maxScore: number;
  percentage: number;
  level: LanguageLevel;
  completedAt: Date;
  timeSpent: number; // in seconds
  answers: AnswerRecord[];
}

export interface AnswerRecord {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  pointsEarned: number;
  feedback?: string;
}

export interface SpeakingResult extends TestResult {
  type: TestType.SPEAKING;
  pronunciationScore: number;
  fluencyScore: number;
  grammarScore: number;
  vocabularyScore: number;
  audioRecordingUrl: string;
}

// DTOs
export interface SubmitTestDTO {
  testId: string;
  answers: { questionId: string; answer: string }[];
  timeSpent: number;
}

export interface TestResultSummaryDTO {
  testId: string;
  type: TestType;
  score: number;
  percentage: number;
  level: LanguageLevel;
  completedAt: Date;
  strengths: string[];
  weaknesses: string[];
}
