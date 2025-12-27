import bcrypt from 'bcryptjs';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/environment';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO, UserResponseDTO } from '../models/user.types';
import { TokenPayload } from '../middleware/auth';
import { 
  BadRequestError, 
  UnauthorizedError, 
  ConflictError,
  NotFoundError 
} from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Register a new user
   */
  async register(data: CreateUserDTO): Promise<UserResponseDTO> {
    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await this.userRepository.create({
      ...data,
      passwordHash,
    });

    // TODO: Send verification email via NotificationService

    logger.info(`New user registered: ${user.email}`);
    return this.toUserResponse(user);
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<{
    user: UserResponseDTO;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    const tokens = this.generateTokens(user);

    logger.info(`User logged in: ${user.email}`);
    return {
      user: this.toUserResponse(user),
      ...tokens,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret
      ) as TokenPayload;

      const user = await this.userRepository.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<void> {
    // TODO: Implement email verification logic
    throw new BadRequestError('Not implemented');
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists
      return;
    }

    // TODO: Generate reset token and send email
    logger.info(`Password reset requested for: ${email}`);
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // TODO: Validate token and update password
    throw new BadRequestError('Not implemented');
  }

  /**
   * Generate access and refresh tokens
   */
  private generateTokens(user: any): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessSecret: Secret = config.jwt.accessSecret;
    const refreshSecret: Secret = config.jwt.refreshSecret;

    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: config.jwt.accessExpiresIn as SignOptions['expiresIn'],
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn as SignOptions['expiresIn'],
    });

    return { accessToken, refreshToken };
  }

  /**
   * Convert user entity to response DTO
   */
  private toUserResponse(user: any): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    };
  }
}

export default new AuthService();
