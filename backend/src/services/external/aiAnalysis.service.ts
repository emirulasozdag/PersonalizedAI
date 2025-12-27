import axios from 'axios';
import { config } from '../../config/environment';
import { logger } from '../../utils/logger';

/**
 * External AI Analysis Engine Service
 * Handles communication with the AI service for analyzing student data
 */
export class AIAnalysisService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.services.aiAnalysisEngine;
  }

  /**
   * Analyze test results
   */
  async analyzeTestResult(testResult: any): Promise<{
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  }> {
    try {
      const response = await axios.post(`${this.baseUrl}/analyze/test`, {
        testResult,
      });
      return response.data;
    } catch (error) {
      logger.error('AI Analysis Service error:', error);
      // Return default analysis on failure
      return {
        strengths: [],
        weaknesses: [],
        recommendations: [],
      };
    }
  }

  /**
   * Get level recommendation
   */
  async getLevelRecommendation(studentId: string): Promise<string> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/recommend/level/${studentId}`
      );
      return response.data.level;
    } catch (error) {
      logger.error('AI Analysis Service error:', error);
      return 'B1'; // Default level
    }
  }

  /**
   * Analyze student progress patterns
   */
  async analyzeProgressPatterns(studentId: string): Promise<{
    patterns: string[];
    suggestions: string[];
  }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/analyze/progress/${studentId}`
      );
      return response.data;
    } catch (error) {
      logger.error('AI Analysis Service error:', error);
      return { patterns: [], suggestions: [] };
    }
  }
}
