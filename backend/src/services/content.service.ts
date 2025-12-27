import { ContentRepository } from '../repositories/content.repository';
import { LessonPlanRepository } from '../repositories/lessonPlan.repository';
import { 
  Content, 
  LessonPlan, 
  GenerateContentDTO,
  LessonPlanGenerationDTO,
  Topic 
} from '../models/content.types';
import { LanguageLevel, ContentType } from '../models/enums';
import { NotFoundError } from '../middleware/errorHandler';
import { AIContentService } from './external/aiContent.service';
import { logger } from '../utils/logger';

export class ContentDeliveryService {
  private contentRepository: ContentRepository;
  private lessonPlanRepository: LessonPlanRepository;
  private aiContentService: AIContentService;

  constructor() {
    this.contentRepository = new ContentRepository();
    this.lessonPlanRepository = new LessonPlanRepository();
    this.aiContentService = new AIContentService();
  }

  /**
   * Get content by ID
   */
  async getContentById(contentId: string): Promise<Content> {
    const content = await this.contentRepository.findById(contentId);
    if (!content) {
      throw new NotFoundError('Content not found');
    }
    return content;
  }

  /**
   * Get content for student's level
   */
  async getContentForLevel(
    level: LanguageLevel,
    type?: ContentType
  ): Promise<Content[]> {
    return this.contentRepository.findByLevel(level, type);
  }

  /**
   * Get student's current lesson plan
   */
  async getStudentLessonPlan(studentId: string): Promise<LessonPlan | null> {
    return this.lessonPlanRepository.findActiveByStudentId(studentId);
  }

  /**
   * Get all topics
   */
  async getTopics(level?: LanguageLevel): Promise<Topic[]> {
    return this.contentRepository.findTopics(level);
  }

  /**
   * Mark content as completed
   */
  async markContentCompleted(
    studentId: string,
    contentId: string,
    score?: number
  ): Promise<void> {
    await this.lessonPlanRepository.markItemCompleted(
      studentId,
      contentId,
      score
    );
    logger.info(`Content ${contentId} completed by student ${studentId}`);
  }
}

export class ContentGenerationService {
  private contentRepository: ContentRepository;
  private aiContentService: AIContentService;

  constructor() {
    this.contentRepository = new ContentRepository();
    this.aiContentService = new AIContentService();
  }

  /**
   * Generate new content using AI
   */
  async generateContent(data: GenerateContentDTO): Promise<Content> {
    const generatedContent = await this.aiContentService.generateContent({
      topicId: data.topicId,
      level: data.level,
      type: data.type,
      instructions: data.teacherInstructions,
    });

    const content = await this.contentRepository.create({
      ...generatedContent,
      isAiGenerated: true,
    });

    logger.info(`AI content generated: ${content.id} for student ${data.studentId}`);
    return content;
  }

  /**
   * Update existing content
   */
  async updateContent(
    contentId: string,
    updates: Partial<Content>
  ): Promise<Content> {
    const content = await this.contentRepository.update(contentId, updates);
    if (!content) {
      throw new NotFoundError('Content not found');
    }
    return content;
  }
}

export class StudentAnalysisService {
  private aiContentService: AIContentService;
  private lessonPlanRepository: LessonPlanRepository;

  constructor() {
    this.aiContentService = new AIContentService();
    this.lessonPlanRepository = new LessonPlanRepository();
  }

  /**
   * Generate personalized lesson plan for student
   */
  async generateLessonPlan(data: LessonPlanGenerationDTO): Promise<LessonPlan> {
    const plan = await this.aiContentService.generateLessonPlan(data);
    const savedPlan = await this.lessonPlanRepository.create({
      studentId: data.studentId,
      ...plan,
    });

    logger.info(`Lesson plan generated for student ${data.studentId}`);
    return savedPlan;
  }

  /**
   * Analyze student performance and get recommendations
   */
  async analyzeStudentPerformance(studentId: string): Promise<{
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  }> {
    return this.aiContentService.analyzePerformance(studentId);
  }
}

export class ContentUpdateService {
  private lessonPlanRepository: LessonPlanRepository;
  private aiContentService: AIContentService;

  constructor() {
    this.lessonPlanRepository = new LessonPlanRepository();
    this.aiContentService = new AIContentService();
  }

  /**
   * Update lesson plan based on student progress
   */
  async updateLessonPlanFromProgress(
    studentId: string
  ): Promise<{ updated: boolean; rationale: string }> {
    const currentPlan = await this.lessonPlanRepository.findActiveByStudentId(studentId);
    
    if (!currentPlan) {
      return { updated: false, rationale: 'No active lesson plan found' };
    }

    const update = await this.aiContentService.suggestPlanUpdate(
      studentId,
      currentPlan.id
    );

    if (update.shouldUpdate) {
      await this.lessonPlanRepository.update(currentPlan.id, update.changes);
      return { updated: true, rationale: update.rationale };
    }

    return { updated: false, rationale: 'No update needed' };
  }
}
