import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { sendSuccess, sendPaginated, calculatePagination } from '../utils/response';
import { NotFoundError } from '../middleware/errorHandler';

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepository.findById(req.user!.userId);
      if (!user) throw new NotFoundError('User not found');
      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  };

  updateCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepository.update(req.user!.userId, req.body);
      sendSuccess(res, user, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepository.findById(req.params.userId);
      if (!user) throw new NotFoundError('User not found');
      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const role = req.query.role as any;

      const { users, total } = await this.userRepository.findAll(page, limit, role);
      const pagination = calculatePagination(page, limit, total);
      sendPaginated(res, users, pagination);
    } catch (error) {
      next(error);
    }
  };

  getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Implement get students for teacher
      sendSuccess(res, []);
    } catch (error) {
      next(error);
    }
  };
}
