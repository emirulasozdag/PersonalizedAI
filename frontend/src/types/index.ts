// User types
export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';
export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  languageLevel?: LanguageLevel;
  totalPoints: number;
  dailyStreak: number;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

// Test types
export type TestType = 'PLACEMENT' | 'DIAGNOSTIC' | 'PROGRESS';
export type ModuleType = 'READING' | 'WRITING' | 'LISTENING' | 'SPEAKING';
export type QuestionType = 'MULTIPLE_CHOICE' | 'FILL_BLANK' | 'MATCHING' | 'ESSAY' | 'AUDIO_RESPONSE';

export interface Test {
  id: string;
  name: string;
  description: string;
  type: TestType;
  modules: TestModule[];
}

export interface TestModule {
  id: string;
  type: ModuleType;
  timeLimit: number;
  questions: Question[];
}

export interface Question {
  id: string;
  content: string;
  type: QuestionType;
  options?: string[];
  audioUrl?: string;
  imageUrl?: string;
}

export interface TestResult {
  id: string;
  testId: string;
  overallScore: number;
  moduleScores: Record<ModuleType, number>;
  determinedLevel: LanguageLevel;
  completedAt: string;
}

// Content types
export interface Topic {
  id: string;
  name: string;
  description: string;
  level: LanguageLevel;
  parentId?: string;
  order: number;
  contents: Content[];
}

export interface Content {
  id: string;
  title: string;
  type: 'VIDEO' | 'ARTICLE' | 'EXERCISE' | 'QUIZ' | 'AUDIO';
  body: string;
  mediaUrl?: string;
  duration?: number;
}

export interface LessonPlan {
  id: string;
  topics: Topic[];
  estimatedDuration: number;
  difficulty: LanguageLevel;
  createdAt: string;
}

// Progress types
export interface Progress {
  id: string;
  currentLevel: LanguageLevel;
  completedTopics: string[];
  currentTopicId?: string;
  totalStudyTime: number;
  averageScore: number;
}

export interface ContentProgress {
  id: string;
  contentId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  score?: number;
  timeSpent: number;
  completedAt?: string;
}

// Assignment types
export type AssignmentStatus = 'PENDING' | 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  topicId: string;
  contents: Content[];
  createdBy: User;
}

export interface StudentAssignment {
  id: string;
  assignment: Assignment;
  status: AssignmentStatus;
  startedAt?: string;
  submittedAt?: string;
  score?: number;
  feedback?: string;
}

// Communication types
export interface Message {
  id: string;
  subject: string;
  body: string;
  sender: User;
  recipient: User;
  isRead: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: User;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  createdAt: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  context: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Reward types
export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'BADGE' | 'ACHIEVEMENT' | 'MILESTONE';
  iconUrl: string;
  pointValue: number;
  criteria: string;
}

export interface StudentReward {
  id: string;
  reward: Reward;
  earnedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
