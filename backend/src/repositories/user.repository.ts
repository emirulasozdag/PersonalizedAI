import prisma from '../config/database';
import { User, CreateUserDTO } from '../models/user.types';
import { UserRole } from '../models/enums';

/**
 * User Repository - Database operations for users
 */
export class UserRepository {
  /**
   * Create a new user
   */
  async create(data: Omit<CreateUserDTO, 'password'> & { passwordHash: string }): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        isEmailVerified: false,
        isActive: true,
      },
    }) as unknown as User;
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    }) as unknown as User | null;
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    }) as unknown as User | null;
  }

  /**
   * Update user
   */
  async update(id: string, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    }) as unknown as User;
  }

  /**
   * Find all users with pagination
   */
  async findAll(
    page: number = 1,
    limit: number = 20,
    role?: UserRole
  ): Promise<{ users: User[]; total: number }> {
    const where = role ? { role } : {};
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { users: users as unknown as User[], total };
  }

  /**
   * Get user statistics
   */
  async getStats(): Promise<{
    total: number;
    students: number;
    teachers: number;
    admins: number;
    activeToday: number;
    newThisWeek: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [total, students, teachers, admins, activeToday, newThisWeek] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.STUDENT } }),
      prisma.user.count({ where: { role: UserRole.TEACHER } }),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({
        where: { updatedAt: { gte: today } },
      }),
      prisma.user.count({
        where: { createdAt: { gte: weekAgo } },
      }),
    ]);

    return { total, students, teachers, admins, activeToday, newThisWeek };
  }

  /**
   * Delete user
   */
  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
