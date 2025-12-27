// =============================================================================
// Personalized AI - Backend Entry Point
// AI-Powered Adaptive Curriculum System
// =============================================================================

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/environment';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { logger } from './utils/logger';

// Route imports
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import testRoutes from './routes/test.routes';
import contentRoutes from './routes/content.routes';
import progressRoutes from './routes/progress.routes';
import assignmentRoutes from './routes/assignment.routes';
import messageRoutes from './routes/message.routes';
import feedbackRoutes from './routes/feedback.routes';
import rewardRoutes from './routes/reward.routes';
import chatbotRoutes from './routes/chatbot.routes';
import adminRoutes from './routes/admin.routes';

const app: Application = express();

// =============================================================================
// Middleware
// =============================================================================
app.use(helmet());
app.use(cors({
  origin: config.corsOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// =============================================================================
// API Routes
// =============================================================================
const API_PREFIX = '/api';

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/tests`, testRoutes);
app.use(`${API_PREFIX}/content`, contentRoutes);
app.use(`${API_PREFIX}/progress`, progressRoutes);
app.use(`${API_PREFIX}/assignments`, assignmentRoutes);
app.use(`${API_PREFIX}/messages`, messageRoutes);
app.use(`${API_PREFIX}/feedback`, feedbackRoutes);
app.use(`${API_PREFIX}/rewards`, rewardRoutes);
app.use(`${API_PREFIX}/chatbot`, chatbotRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// =============================================================================
// Error Handling
// =============================================================================
app.use(errorHandler);

// =============================================================================
// Server Startup
// =============================================================================
const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📚 API Documentation: http://localhost:${PORT}/api/v1`);
  logger.info(`🔧 Environment: ${config.nodeEnv}`);
});

export default app;
