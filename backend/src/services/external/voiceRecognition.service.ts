import axios from 'axios';
import { config } from '../../config/environment';
import { logger } from '../../utils/logger';

/**
 * External Voice Recognition Service
 * Handles pronunciation analysis and voice processing
 */
export class VoiceRecognitionService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.services.voiceRecognition;
  }

  /**
   * Analyze audio recording for pronunciation
   */
  async analyzeAudio(audioUrl: string): Promise<{
    pronunciationScore: number;
    fluencyScore: number;
    grammarScore: number;
    vocabularyScore: number;
    overallScore: number;
    transcript: string;
    feedback: string[];
  }> {
    try {
      const response = await axios.post(`${this.baseUrl}/analyze`, {
        audioUrl,
      });
      return response.data;
    } catch (error) {
      logger.error('Voice Recognition Service error:', error);
      // Return default scores on failure
      return {
        pronunciationScore: 0,
        fluencyScore: 0,
        grammarScore: 0,
        vocabularyScore: 0,
        overallScore: 0,
        transcript: '',
        feedback: ['Unable to analyze audio at this time'],
      };
    }
  }

  /**
   * Convert speech to text
   */
  async speechToText(audioUrl: string): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/transcribe`, {
        audioUrl,
      });
      return response.data.transcript;
    } catch (error) {
      logger.error('Voice Recognition Service error:', error);
      return '';
    }
  }

  /**
   * Compare pronunciation with reference
   */
  async comparePronunciation(
    audioUrl: string,
    referenceText: string
  ): Promise<{
    accuracy: number;
    errors: { word: string; expected: string; actual: string }[];
  }> {
    try {
      const response = await axios.post(`${this.baseUrl}/compare`, {
        audioUrl,
        referenceText,
      });
      return response.data;
    } catch (error) {
      logger.error('Voice Recognition Service error:', error);
      return { accuracy: 0, errors: [] };
    }
  }
}
