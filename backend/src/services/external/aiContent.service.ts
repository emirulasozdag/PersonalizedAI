import axios from 'axios';
import OpenAI from 'openai';
import { config } from '../../config/environment';
import { LanguageLevel, ContentType } from '../../models/enums';
import { Content, LessonPlan, LessonPlanGenerationDTO } from '../../models/content.types';
import { logger } from '../../utils/logger';

/**
 * External AI Content Engine Service
 * Handles AI-powered content generation
 */
export class AIContentService {
  private baseUrl: string;
  private openai: OpenAI;

  constructor() {
    this.baseUrl = config.services.aiContentEngine;
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey,
    });
  }

  /**
   * Generate new learning content
   */
  async generateContent(params: {
    topicId: string;
    level: LanguageLevel;
    type: ContentType;
    instructions?: string;
  }): Promise<Partial<Content>> {
    try {
      // Try external service first
      const response = await axios.post(`${this.baseUrl}/generate/content`, params);
      return response.data;
    } catch (error) {
      logger.warn('External AI service unavailable, using OpenAI fallback');
      return this.generateContentWithOpenAI(params);
    }
  }

  /**
   * Generate lesson plan
   */
  async generateLessonPlan(
    data: LessonPlanGenerationDTO
  ): Promise<Partial<LessonPlan>> {
    try {
      const response = await axios.post(`${this.baseUrl}/generate/plan`, data);
      return response.data;
    } catch (error) {
      logger.error('AI Content Service error:', error);
      return this.generateDefaultPlan(data);
    }
  }

  /**
   * Analyze student performance
   */
  async analyzePerformance(studentId: string): Promise<{
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/analyze/student/${studentId}`
      );
      return response.data;
    } catch (error) {
      logger.error('AI Content Service error:', error);
      return { strengths: [], weaknesses: [], recommendations: [] };
    }
  }

  /**
   * Suggest plan updates based on progress
   */
  async suggestPlanUpdate(
    studentId: string,
    planId: string
  ): Promise<{
    shouldUpdate: boolean;
    changes: Partial<LessonPlan>;
    rationale: string;
  }> {
    try {
      const response = await axios.post(`${this.baseUrl}/suggest/update`, {
        studentId,
        planId,
      });
      return response.data;
    } catch (error) {
      logger.error('AI Content Service error:', error);
      return {
        shouldUpdate: false,
        changes: {},
        rationale: 'Unable to analyze at this time',
      };
    }
  }

  /**
   * Fallback: Generate content using OpenAI
   */
  private async generateContentWithOpenAI(params: {
    topicId: string;
    level: LanguageLevel;
    type: ContentType;
    instructions?: string;
  }): Promise<Partial<Content>> {
    const prompt = `Generate an English learning ${params.type} for level ${params.level}.
${params.instructions ? `Additional instructions: ${params.instructions}` : ''}

Please provide:
1. A title
2. A description
3. The main content (lesson text, exercises, etc.)
4. Duration in minutes

Format as JSON.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return {
        title: result.title || 'Generated Content',
        description: result.description || '',
        content: result.content || '',
        duration: result.duration || 15,
        level: params.level,
        type: params.type,
        topicId: params.topicId,
        isAiGenerated: true,
      };
    } catch (error) {
      logger.error('OpenAI generation error:', error);
      throw error;
    }
  }

  /**
   * Generate a default lesson plan
   */
  private generateDefaultPlan(data: LessonPlanGenerationDTO): Partial<LessonPlan> {
    return {
      studentId: data.studentId,
      title: 'Personalized Learning Plan',
      description: 'A customized plan based on your learning goals',
      level: LanguageLevel.B1,
      topics: [],
      contents: [],
      startDate: new Date(),
      isActive: true,
      aiRationale: 'Default plan generated',
    };
  }
}
