import { z } from 'zod';
import { UserRole, LanguageLevel, FeedbackType, ContentType } from '../models/enums';

// =============================================================================
// Auth Schemas
// =============================================================================

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum([UserRole.STUDENT, UserRole.TEACHER]).default(UserRole.STUDENT),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// =============================================================================
// User Schemas
// =============================================================================

export const updateUserSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

// =============================================================================
// Test Schemas
// =============================================================================

export const submitTestSchema = z.object({
  testId: z.string().uuid(),
  answers: z.array(z.object({
    questionId: z.string().uuid(),
    answer: z.string(),
  })),
  timeSpent: z.number().positive(),
});

export const speakingSubmissionSchema = z.object({
  testId: z.string().uuid(),
  audioUrl: z.string().url(),
  questionId: z.string().uuid(),
});

// =============================================================================
// Content Schemas
// =============================================================================

export const generateContentSchema = z.object({
  studentId: z.string().uuid(),
  topicId: z.string().uuid(),
  level: z.nativeEnum(LanguageLevel),
  type: z.nativeEnum(ContentType),
  teacherInstructions: z.string().optional(),
});

export const updateContentSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  level: z.nativeEnum(LanguageLevel).optional(),
});

// =============================================================================
// Assignment Schemas
// =============================================================================

export const createAssignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  instructions: z.string().min(1, 'Instructions are required'),
  dueDate: z.string().datetime(),
  maxScore: z.number().positive(),
  studentIds: z.array(z.string().uuid()).min(1, 'At least one student is required'),
  isGroupAssignment: z.boolean().optional().default(false),
});

export const submitAssignmentSchema = z.object({
  assignmentId: z.string().uuid(),
  submission: z.string().min(1, 'Submission content is required'),
});

export const gradeAssignmentSchema = z.object({
  score: z.number().min(0),
  feedback: z.string().min(1, 'Feedback is required'),
});

// =============================================================================
// Message Schemas
// =============================================================================

export const sendMessageSchema = z.object({
  recipientId: z.string().uuid(),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
});

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  targetAudience: z.enum(['all', 'students', 'teachers', 'specific']),
  recipientIds: z.array(z.string().uuid()).optional(),
  expiresAt: z.string().datetime().optional(),
});

// =============================================================================
// Feedback Schemas
// =============================================================================

export const submitFeedbackSchema = z.object({
  type: z.nativeEnum(FeedbackType),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

// =============================================================================
// Chatbot Schemas
// =============================================================================

export const chatMessageSchema = z.object({
  sessionId: z.string().uuid().optional(),
  message: z.string().min(1, 'Message is required'),
  context: z.object({
    currentLessonId: z.string().uuid().optional(),
    currentTopicId: z.string().uuid().optional(),
  }).optional(),
});

// =============================================================================
// Pagination Schema
// =============================================================================

export const paginationSchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
