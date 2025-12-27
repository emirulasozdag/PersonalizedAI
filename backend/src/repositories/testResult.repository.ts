import prisma from '../config/database';
import { TestResult, SpeakingResult } from '../models/test.types';

/**
 * Test Result Repository - Database operations for test results
 */
export class TestResultRepository {
  /**
   * Create a new test result
   */
  async create(data: Partial<TestResult>): Promise<TestResult> {
    return prisma.testResult.create({
      data: data as any,
    }) as unknown as TestResult;
  }

  /**
   * Create speaking test result
   */
  async createSpeakingResult(data: Partial<SpeakingResult>): Promise<SpeakingResult> {
    return prisma.speakingResult.create({
      data: data as any,
    }) as unknown as SpeakingResult;
  }

  /**
   * Find result by ID
   */
  async findById(id: string): Promise<TestResult | null> {
    return prisma.testResult.findUnique({
      where: { id },
    }) as unknown as TestResult | null;
  }

  /**
   * Find results by student ID
   */
  async findByStudentId(studentId: string): Promise<TestResult[]> {
    return prisma.testResult.findMany({
      where: { studentId },
      orderBy: { completedAt: 'desc' },
    }) as unknown as TestResult[];
  }

  /**
   * Find results by test ID
   */
  async findByTestId(testId: string): Promise<TestResult[]> {
    return prisma.testResult.findMany({
      where: { testId },
      orderBy: { completedAt: 'desc' },
    }) as unknown as TestResult[];
  }

  /**
   * Get latest result for student and test type
   */
  async getLatestByType(studentId: string, type: string): Promise<TestResult | null> {
    return prisma.testResult.findFirst({
      where: { studentId, type },
      orderBy: { completedAt: 'desc' },
    }) as unknown as TestResult | null;
  }

  /**
   * Get average score for student
   */
  async getAverageScore(studentId: string): Promise<number> {
    const result = await prisma.testResult.aggregate({
      where: { studentId },
      _avg: { percentage: true },
    });
    return result._avg.percentage || 0;
  }
}
