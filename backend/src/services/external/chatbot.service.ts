import axios from 'axios';
import OpenAI from 'openai';
import { config } from '../../config/environment';
import { logger } from '../../utils/logger';

/**
 * External Chatbot Service
 * Handles AI-powered chatbot interactions
 */
export class ChatbotExternalService {
  private baseUrl: string;
  private openai: OpenAI;

  constructor() {
    this.baseUrl = config.services.chatbot;
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey,
    });
  }

  /**
   * Get chatbot response
   */
  async getResponse(
    message: string,
    sessionId: string,
    context?: { currentLessonId?: string; currentTopicId?: string }
  ): Promise<{ message: string; metadata?: Record<string, any> }> {
    try {
      // Try external chatbot service first
      const response = await axios.post(`${this.baseUrl}/chat`, {
        message,
        sessionId,
        context,
      });
      return response.data;
    } catch (error) {
      logger.warn('External chatbot service unavailable, using OpenAI fallback');
      return this.getOpenAIResponse(message, context);
    }
  }

  /**
   * Fallback: Use OpenAI for chatbot responses
   */
  private async getOpenAIResponse(
    message: string,
    context?: { currentLessonId?: string; currentTopicId?: string }
  ): Promise<{ message: string; metadata?: Record<string, any> }> {
    const systemPrompt = `You are a helpful English learning assistant. Your role is to:
- Answer questions about English grammar, vocabulary, and usage
- Help students practice their English skills
- Provide explanations and examples
- Be encouraging and supportive
- Keep responses concise and educational

${context?.currentTopicId ? `The student is currently learning about topic: ${context.currentTopicId}` : ''}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
      });

      return {
        message: completion.choices[0].message.content || 'I apologize, I could not generate a response.',
        metadata: {
          model: 'gpt-3.5-turbo',
          fallback: true,
        },
      };
    } catch (error) {
      logger.error('OpenAI chatbot error:', error);
      return {
        message: 'I apologize, but I am currently unable to respond. Please try again later.',
        metadata: { error: true },
      };
    }
  }

  /**
   * Get conversation suggestions
   */
  async getSuggestions(sessionId: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/suggestions/${sessionId}`
      );
      return response.data.suggestions;
    } catch (error) {
      return [
        'Can you explain present perfect tense?',
        'Give me a vocabulary exercise',
        'Help me practice conversation',
      ];
    }
  }
}
