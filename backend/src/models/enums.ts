// =============================================================================
// Enums - Core system enumerations
// =============================================================================

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum AssignmentStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  GRADED = 'GRADED',
  LATE = 'LATE',
}

export enum ContentType {
  LESSON = 'LESSON',
  EXERCISE = 'EXERCISE',
  QUIZ = 'QUIZ',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  READING = 'READING',
  ROLEPLAY = 'ROLEPLAY',
}

export enum TestType {
  PLACEMENT = 'PLACEMENT',
  READING = 'READING',
  WRITING = 'WRITING',
  LISTENING = 'LISTENING',
  SPEAKING = 'SPEAKING',
}

export enum FeedbackType {
  BUG_REPORT = 'BUG_REPORT',
  SUGGESTION = 'SUGGESTION',
  CONTENT_ISSUE = 'CONTENT_ISSUE',
  GENERAL = 'GENERAL',
}

export enum MessageType {
  DIRECT = 'DIRECT',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export enum RewardType {
  BADGE = 'BADGE',
  POINTS = 'POINTS',
  ACHIEVEMENT = 'ACHIEVEMENT',
}

export enum NotificationType {
  REMINDER = 'REMINDER',
  REWARD = 'REWARD',
  ASSIGNMENT = 'ASSIGNMENT',
  MESSAGE = 'MESSAGE',
  SYSTEM = 'SYSTEM',
}
