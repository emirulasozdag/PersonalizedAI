import { ChatSessionRepository } from '../repositories/chatSession.repository';
import {
  ChatSession,
  ChatMessage,
  ChatMessageDTO,
} from '../models/communication.types';
import { NotFoundError } from '../middleware/errorHandler';
import { ChatbotExternalService } from './external/chatbot.service';
import { logger } from '../utils/logger';

export class ChatbotService {
  private chatSessionRepository: ChatSessionRepository;
  private chatbotExternalService: ChatbotExternalService;

  constructor() {
    this.chatSessionRepository = new ChatSessionRepository();
    this.chatbotExternalService = new ChatbotExternalService();
  }

  /**
   * Start a new chat session
   */
  async startSession(studentId: string): Promise<ChatSession> {
    const session = await this.chatSessionRepository.create({
      studentId,
      startedAt: new Date(),
      isActive: true,
      messageCount: 0,
    });

    logger.info(`Chat session started: ${session.id} for student ${studentId}`);
    return session;
  }

  /**
   * Send a message and get response
   */
  async sendMessage(
    studentId: string,
    data: ChatMessageDTO
  ): Promise<ChatMessage> {
    let session: ChatSession;

    if (data.sessionId) {
      const existingSession = await this.chatSessionRepository.findById(data.sessionId);
      if (!existingSession || existingSession.studentId !== studentId) {
        throw new NotFoundError('Session not found');
      }
      session = existingSession;
    } else {
      session = await this.startSession(studentId);
    }

    // Save user message
    await this.chatSessionRepository.addMessage({
      sessionId: session.id,
      role: 'user',
      content: data.message,
      timestamp: new Date(),
      metadata: data.context
        ? {
            lessonId: data.context.currentLessonId,
            topicId: data.context.currentTopicId,
          }
        : undefined,
    });

    // Get chatbot response
    const response = await this.chatbotExternalService.getResponse(
      data.message,
      session.id,
      data.context
    );

    // Save assistant message
    const assistantMessage = await this.chatSessionRepository.addMessage({
      sessionId: session.id,
      role: 'assistant',
      content: response.message,
      timestamp: new Date(),
      metadata: response.metadata,
    });

    // Update message count
    await this.chatSessionRepository.incrementMessageCount(session.id);

    return assistantMessage;
  }

  /**
   * Get chat history for a session
   */
  async getSessionHistory(
    studentId: string,
    sessionId: string
  ): Promise<ChatMessage[]> {
    const session = await this.chatSessionRepository.findById(sessionId);
    if (!session || session.studentId !== studentId) {
      throw new NotFoundError('Session not found');
    }

    return this.chatSessionRepository.getMessages(sessionId);
  }

  /**
   * Get all sessions for a student
   */
  async getStudentSessions(studentId: string): Promise<ChatSession[]> {
    return this.chatSessionRepository.findByStudentId(studentId);
  }

  /**
   * End a chat session
   */
  async endSession(
    studentId: string,
    sessionId: string
  ): Promise<void> {
    const session = await this.chatSessionRepository.findById(sessionId);
    if (!session || session.studentId !== studentId) {
      throw new NotFoundError('Session not found');
    }

    await this.chatSessionRepository.update(sessionId, {
      isActive: false,
      endedAt: new Date(),
    });

    logger.info(`Chat session ended: ${sessionId}`);
  }
}
