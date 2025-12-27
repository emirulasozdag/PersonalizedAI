import { AssignmentRepository } from '../repositories/assignment.repository';
import { StudentAssignmentRepository } from '../repositories/studentAssignment.repository';
import {
  Assignment,
  StudentAssignment,
  CreateAssignmentDTO,
  SubmitAssignmentDTO,
  GradeAssignmentDTO,
} from '../models/assignment.types';
import { AssignmentStatus } from '../models/enums';
import { NotFoundError, ForbiddenError, BadRequestError } from '../middleware/errorHandler';
import { NotificationService } from './external/notification.service';
import { logger } from '../utils/logger';

export class AssignmentService {
  private assignmentRepository: AssignmentRepository;
  private studentAssignmentRepository: StudentAssignmentRepository;
  private notificationService: NotificationService;

  constructor() {
    this.assignmentRepository = new AssignmentRepository();
    this.studentAssignmentRepository = new StudentAssignmentRepository();
    this.notificationService = new NotificationService();
  }

  /**
   * Create a new assignment
   */
  async createAssignment(
    teacherId: string,
    data: CreateAssignmentDTO
  ): Promise<Assignment> {
    // Validate due date
    if (new Date(data.dueDate) < new Date()) {
      throw new BadRequestError('Due date must be in the future');
    }

    const assignment = await this.assignmentRepository.create({
      ...data,
      teacherId,
    });

    // Create student assignments
    for (const studentId of data.studentIds) {
      await this.studentAssignmentRepository.create({
        assignmentId: assignment.id,
        studentId,
        status: AssignmentStatus.PENDING,
      });

      // Send notification
      await this.notificationService.sendAssignmentNotification(
        studentId,
        assignment.id,
        assignment.title
      );
    }

    logger.info(`Assignment created: ${assignment.id} by teacher ${teacherId}`);
    return assignment;
  }

  /**
   * Get assignment by ID
   */
  async getAssignmentById(assignmentId: string): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findById(assignmentId);
    if (!assignment) {
      throw new NotFoundError('Assignment not found');
    }
    return assignment;
  }

  /**
   * Get assignments for a student
   */
  async getStudentAssignments(
    studentId: string,
    status?: AssignmentStatus
  ): Promise<StudentAssignment[]> {
    return this.studentAssignmentRepository.findByStudentId(studentId, status);
  }

  /**
   * Get assignments created by a teacher
   */
  async getTeacherAssignments(teacherId: string): Promise<Assignment[]> {
    return this.assignmentRepository.findByTeacherId(teacherId);
  }

  /**
   * Submit an assignment
   */
  async submitAssignment(
    studentId: string,
    data: SubmitAssignmentDTO
  ): Promise<StudentAssignment> {
    const studentAssignment = await this.studentAssignmentRepository.findByStudentAndAssignment(
      studentId,
      data.assignmentId
    );

    if (!studentAssignment) {
      throw new NotFoundError('Assignment not found');
    }

    if (studentAssignment.status === AssignmentStatus.SUBMITTED ||
        studentAssignment.status === AssignmentStatus.GRADED) {
      throw new BadRequestError('Assignment already submitted');
    }

    const assignment = await this.getAssignmentById(data.assignmentId);
    const isLate = new Date() > new Date(assignment.dueDate);

    const updated = await this.studentAssignmentRepository.update(
      studentAssignment.id,
      {
        submission: data.submission,
        submittedAt: new Date(),
        status: isLate ? AssignmentStatus.LATE : AssignmentStatus.SUBMITTED,
      }
    );

    logger.info(`Assignment ${data.assignmentId} submitted by student ${studentId}`);
    return updated;
  }

  /**
   * Grade an assignment
   */
  async gradeAssignment(
    teacherId: string,
    studentAssignmentId: string,
    data: GradeAssignmentDTO
  ): Promise<StudentAssignment> {
    const studentAssignment = await this.studentAssignmentRepository.findById(
      studentAssignmentId
    );

    if (!studentAssignment) {
      throw new NotFoundError('Student assignment not found');
    }

    const assignment = await this.getAssignmentById(studentAssignment.assignmentId);

    // Verify teacher owns this assignment
    if (assignment.teacherId !== teacherId) {
      throw new ForbiddenError('Not authorized to grade this assignment');
    }

    if (data.score > assignment.maxScore) {
      throw new BadRequestError(`Score cannot exceed ${assignment.maxScore}`);
    }

    const updated = await this.studentAssignmentRepository.update(
      studentAssignmentId,
      {
        score: data.score,
        feedback: data.feedback,
        gradedAt: new Date(),
        gradedBy: teacherId,
        status: AssignmentStatus.GRADED,
      }
    );

    // Notify student
    await this.notificationService.sendGradeNotification(
      studentAssignment.studentId,
      assignment.title,
      data.score
    );

    logger.info(`Assignment ${studentAssignmentId} graded by teacher ${teacherId}`);
    return updated;
  }
}
