// =============================================================================
// Communication Types - Messages, announcements, chatbot
// =============================================================================

import { MessageType, FeedbackType } from './enums';

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  type: MessageType;
  subject: string;
  content: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

export interface Announcement {
  id: string;
  authorId: string;
  title: string;
  content: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'specific';
  recipientIds?: string[];
  isPublished: boolean;
  publishedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatSession {
  id: string;
  studentId: string;
  startedAt: Date;
  endedAt?: Date;
  isActive: boolean;
  messageCount: number;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    topicId?: string;
    lessonId?: string;
    intent?: string;
  };
}

export interface Feedback {
  id: string;
  userId: string;
  type: FeedbackType;
  subject: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  adminResponse?: string;
  createdAt: Date;
  updatedAt: Date;
}

// DTOs
export interface SendMessageDTO {
  recipientId: string;
  subject: string;
  content: string;
}

export interface CreateAnnouncementDTO {
  title: string;
  content: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'specific';
  recipientIds?: string[];
  expiresAt?: Date;
}

export interface ChatMessageDTO {
  sessionId?: string;
  message: string;
  context?: {
    currentLessonId?: string;
    currentTopicId?: string;
  };
}

export interface SubmitFeedbackDTO {
  type: FeedbackType;
  subject: string;
  description: string;
}
