import prisma from '../config/database';
import { Assignment } from '../models/assignment.types';

/**
 * Assignment Repository - Database operations for assignments
 */
export class AssignmentRepository {
  async findById(id: string): Promise<Assignment | null> {
    return prisma.assignment.findUnique({ where: { id } }) as unknown as Assignment | null;
  }

  async findByTeacherId(teacherId: string): Promise<Assignment[]> {
    return prisma.assignment.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' },
    }) as unknown as Assignment[];
  }

  async create(data: Partial<Assignment> & { teacherId: string }): Promise<Assignment> {
    return prisma.assignment.create({ data: data as any }) as unknown as Assignment;
  }

  async update(id: string, data: Partial<Assignment>): Promise<Assignment> {
    return prisma.assignment.update({ where: { id }, data: data as any }) as unknown as Assignment;
  }

  async delete(id: string): Promise<void> {
    await prisma.assignment.delete({ where: { id } });
  }
}
