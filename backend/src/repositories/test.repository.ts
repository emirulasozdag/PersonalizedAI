import prisma from '../config/database';
import { Test, TestModule } from '../models/test.types';
import { TestType } from '../models/enums';

/**
 * Test Repository - Database operations for tests
 */
export class TestRepository {
  /**
   * Find test by ID
   */
  async findById(id: string): Promise<Test | null> {
    return prisma.test.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            questions: true,
          },
        },
      },
    }) as unknown as Test | null;
  }

  /**
   * Find active placement test
   */
  async findActivePlacementTest(): Promise<Test | null> {
    return prisma.test.findFirst({
      where: {
        type: TestType.PLACEMENT,
        isActive: true,
      },
      include: {
        modules: {
          include: {
            questions: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    }) as unknown as Test | null;
  }

  /**
   * Find tests by type
   */
  async findByType(type: TestType): Promise<Test[]> {
    return prisma.test.findMany({
      where: { type, isActive: true },
    }) as unknown as Test[];
  }

  /**
   * Create a new test
   */
  async create(data: Partial<Test>): Promise<Test> {
    return prisma.test.create({
      data: data as any,
    }) as unknown as Test;
  }

  /**
   * Update test
   */
  async update(id: string, data: Partial<Test>): Promise<Test> {
    return prisma.test.update({
      where: { id },
      data: data as any,
    }) as unknown as Test;
  }

  /**
   * Add module to test
   */
  async addModule(testId: string, module: Partial<TestModule>): Promise<TestModule> {
    return prisma.testModule.create({
      data: {
        ...module as any,
        testId,
      },
    }) as unknown as TestModule;
  }
}
