// =============================================================================
// Assignment Types - Homework and tasks
// =============================================================================

import { AssignmentStatus } from './enums';

export interface Assignment {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: Date;
  maxScore: number;
  attachments?: string[];
  isGroupAssignment: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentAssignment {
  id: string;
  assignmentId: string;
  studentId: string;
  status: AssignmentStatus;
  submission?: string;
  submittedAt?: Date;
  score?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: string;
}

// DTOs
export interface CreateAssignmentDTO {
  title: string;
  description: string;
  instructions: string;
  dueDate: Date;
  maxScore: number;
  studentIds: string[];
  isGroupAssignment?: boolean;
  attachments?: string[];
}

export interface SubmitAssignmentDTO {
  assignmentId: string;
  submission: string;
  attachments?: string[];
}

export interface GradeAssignmentDTO {
  studentAssignmentId: string;
  score: number;
  feedback: string;
}
