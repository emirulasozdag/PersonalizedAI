import { TestRepository } from '../repositories/test.repository';
import { TestResultRepository } from '../repositories/testResult.repository';
import { 
  Test, 
  TestResult, 
  SubmitTestDTO, 
  TestResultSummaryDTO,
  SpeakingResult 
} from '../models/test.types';
import { LanguageLevel, TestType } from '../models/enums';
import { NotFoundError, BadRequestError } from '../middleware/errorHandler';
import { AIAnalysisService } from './external/aiAnalysis.service';
import { VoiceRecognitionService } from './external/voiceRecognition.service';
import { logger } from '../utils/logger';

export class PlacementTestService {
  private testRepository: TestRepository;
  private testResultRepository: TestResultRepository;
  private aiAnalysisService: AIAnalysisService;
  private voiceRecognitionService: VoiceRecognitionService;

  constructor() {
    this.testRepository = new TestRepository();
    this.testResultRepository = new TestResultRepository();
    this.aiAnalysisService = new AIAnalysisService();
    this.voiceRecognitionService = new VoiceRecognitionService();
  }

  /**
   * Get available placement test for student
   */
  async getPlacementTest(studentId: string): Promise<Test> {
    const test = await this.testRepository.findActivePlacementTest();
    if (!test) {
      throw new NotFoundError('No active placement test found');
    }
    return test;
  }

  /**
   * Get test by ID
   */
  async getTestById(testId: string): Promise<Test> {
    const test = await this.testRepository.findById(testId);
    if (!test) {
      throw new NotFoundError('Test not found');
    }
    return test;
  }

  /**
   * Submit test answers and calculate results
   */
  async submitTest(
    studentId: string,
    submission: SubmitTestDTO
  ): Promise<TestResult> {
    const test = await this.getTestById(submission.testId);

    // Calculate score
    const { score, maxScore, answers } = await this.calculateScore(
      test,
      submission.answers
    );

    // Determine level based on percentage
    const percentage = (score / maxScore) * 100;
    const level = this.determineLevel(percentage);

    // Create result
    const result = await this.testResultRepository.create({
      testId: test.id,
      studentId,
      type: test.type,
      score,
      maxScore,
      percentage,
      level,
      completedAt: new Date(),
      timeSpent: submission.timeSpent,
      answers,
    });

    // Send to AI for analysis
    await this.aiAnalysisService.analyzeTestResult(result);

    logger.info(`Test submitted: ${test.id} by student ${studentId}, level: ${level}`);
    return result;
  }

  /**
   * Submit speaking test with audio
   */
  async submitSpeakingTest(
    studentId: string,
    testId: string,
    audioUrl: string
  ): Promise<SpeakingResult> {
    const test = await this.getTestById(testId);
    
    if (test.type !== TestType.SPEAKING) {
      throw new BadRequestError('Invalid test type');
    }

    // Analyze pronunciation via Voice Recognition Service
    const analysis = await this.voiceRecognitionService.analyzeAudio(audioUrl);

    const result = await this.testResultRepository.createSpeakingResult({
      testId,
      studentId,
      type: TestType.SPEAKING,
      pronunciationScore: analysis.pronunciationScore,
      fluencyScore: analysis.fluencyScore,
      grammarScore: analysis.grammarScore,
      vocabularyScore: analysis.vocabularyScore,
      audioRecordingUrl: audioUrl,
      score: analysis.overallScore,
      maxScore: 100,
      percentage: analysis.overallScore,
      level: this.determineLevel(analysis.overallScore),
      completedAt: new Date(),
      timeSpent: 0,
      answers: [],
    });

    return result;
  }

  /**
   * Get test results for a student
   */
  async getStudentResults(studentId: string): Promise<TestResultSummaryDTO[]> {
    const results = await this.testResultRepository.findByStudentId(studentId);
    return results.map(this.toResultSummary);
  }

  /**
   * Get detailed result by ID
   */
  async getResultById(resultId: string): Promise<TestResult> {
    const result = await this.testResultRepository.findById(resultId);
    if (!result) {
      throw new NotFoundError('Result not found');
    }
    return result;
  }

  /**
   * Calculate score from answers
   */
  private async calculateScore(
    test: Test,
    answers: { questionId: string; answer: string }[]
  ): Promise<{ score: number; maxScore: number; answers: any[] }> {
    // TODO: Implement actual scoring logic
    let score = 0;
    let maxScore = 0;
    const processedAnswers = [];

    // Placeholder implementation
    for (const answer of answers) {
      const points = 1; // Each question worth 1 point
      maxScore += points;
      // TODO: Compare with correct answer
      const isCorrect = Math.random() > 0.5; // Placeholder
      if (isCorrect) score += points;

      processedAnswers.push({
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        pointsEarned: isCorrect ? points : 0,
      });
    }

    return { score, maxScore, answers: processedAnswers };
  }

  /**
   * Determine language level from percentage
   */
  private determineLevel(percentage: number): LanguageLevel {
    if (percentage >= 90) return LanguageLevel.C2;
    if (percentage >= 80) return LanguageLevel.C1;
    if (percentage >= 70) return LanguageLevel.B2;
    if (percentage >= 60) return LanguageLevel.B1;
    if (percentage >= 50) return LanguageLevel.A2;
    return LanguageLevel.A1;
  }

  /**
   * Convert result to summary DTO
   */
  private toResultSummary(result: TestResult): TestResultSummaryDTO {
    return {
      testId: result.testId,
      type: result.type,
      score: result.score,
      percentage: result.percentage,
      level: result.level,
      completedAt: result.completedAt,
      strengths: [], // TODO: Extract from AI analysis
      weaknesses: [], // TODO: Extract from AI analysis
    };
  }
}

// Individual test service stubs
export class ReadingTestService extends PlacementTestService {}
export class WritingTestService extends PlacementTestService {}
export class ListeningTestService extends PlacementTestService {}
export class SpeakingTestService extends PlacementTestService {}
