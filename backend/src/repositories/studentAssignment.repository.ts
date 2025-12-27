import prisma from '../config/database';
import { StudentAssignment } from '../models/assignment.types';
import { AssignmentStatus } from '../models/enums';

/**
 * Student Assignment Repository - Database operations for student assignments
 */
export class StudentAssignmentRepository {
  async findById(id: string): Promise<StudentAssignment | null> {
    return prisma.studentAssignment.findUnique({ where: { id } }) as unknown as StudentAssignment | null;
  }

  async findByStudentId(studentId: string, status?: AssignmentStatus): Promise<StudentAssignment[]> {
    const where: any = { studentId };
    if (status) where.status = status;
    return prisma.studentAssignment.findMany({
      where,
      include: { assignment: true },
      orderBy: { assignment: { dueDate: 'asc' } },
    }) as unknown as StudentAssignment[];
  }

  async findByStudentAndAssignment(studentId: string, assignmentId: string): Promise<StudentAssignment | null> {
    return prisma.studentAssignment.findFirst({
      where: { studentId, assignmentId },
    }) as unknown as StudentAssignment | null;
  }

  async create(data: Partial<StudentAssignment>): Promise<StudentAssignment> {
    return prisma.studentAssignment.create({ data: data as any }) as unknown as StudentAssignment;
  }

  async update(id: string, data: Partial<StudentAssignment>): Promise<StudentAssignment> {
    return prisma.studentAssignment.update({ where: { id }, data: data as any }) as unknown as StudentAssignment;
  }
}
