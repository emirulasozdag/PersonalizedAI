// =============================================================================
// User Types - User, Student, Teacher, Admin entities
// =============================================================================

import { UserRole, LanguageLevel } from './enums';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student extends User {
  role: UserRole.STUDENT;
  readingLevel: LanguageLevel | null;
  writingLevel: LanguageLevel | null;
  listeningLevel: LanguageLevel | null;
  speakingLevel: LanguageLevel | null;
  overallLevel: LanguageLevel | null;
  dailyStreak: number;
  lastActiveAt: Date | null;
  totalPoints: number;
  teacherId: string | null;
}

export interface Teacher extends User {
  role: UserRole.TEACHER;
  specialization: string | null;
  students: string[]; // Student IDs
}

export interface Admin extends User {
  role: UserRole.ADMIN;
  permissions: string[];
}

// DTOs
export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: Date;
}
