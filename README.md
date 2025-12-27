# PersonalizedAI - AI-Powered Adaptive English Learning Curriculum

An intelligent English language learning platform that provides personalized learning experiences through AI-driven assessments, content generation, and adaptive lesson planning.

> **Course Project**: SENG 321 - Software Requirements Analysis and Specification  
> **Institution**: Ankara Science University

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development Guide](#development-guide)
- [External Services](#external-services)
- [License](#license)

## 🎯 Overview

PersonalizedAI is a comprehensive English learning platform that adapts to each student's proficiency level and learning pace. The system uses AI to analyze student performance, generate personalized content, and provide intelligent tutoring through an interactive chatbot.

### Key Actors

| Actor | Description |
|-------|-------------|
| **Student** | Takes placement tests, completes lessons, interacts with AI tutor |
| **Teacher** | Creates content, assigns work, monitors student progress |
| **Admin** | Manages users, system settings, and generates reports |

## ✨ Features

### For Students
- **Placement Test**: Multi-module assessment (Reading, Writing, Listening, Speaking) to determine proficiency level (A1-C2)
- **Personalized Lessons**: AI-generated lesson plans based on current level and learning goals
- **Interactive Chatbot**: AI tutor for grammar questions, vocabulary help, and practice conversations
- **Progress Tracking**: Detailed analytics on skill development across all language areas
- **Gamification**: Points, badges, achievements, and leaderboards for motivation
- **Voice Recognition**: Practice speaking with real-time feedback

### For Teachers
- **Student Management**: View student progress, performance analytics, and learning patterns
- **Content Creation**: Create and manage lessons, exercises, and assessments
- **Assignment System**: Assign work to individuals or groups with due dates
- **Announcements**: Broadcast important messages to all students
- **Analytics Dashboard**: Comprehensive reports on class performance

### For Administrators
- **User Management**: Create, modify, and deactivate user accounts
- **System Configuration**: Manage application settings and preferences
- **Reports**: Generate system-wide usage and performance reports
- **Maintenance Mode**: Control system availability during updates

## 🏗️ Architecture

The project follows a **layered architecture** pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React SPA)                    │
├─────────────────────────────────────────────────────────────┤
│                         API Gateway                          │
├─────────────────────────────────────────────────────────────┤
│  Routes → Controllers → Services → Repositories → Database  │
├─────────────────────────────────────────────────────────────┤
│                    External Services                         │
│  (AI Analysis, Content Gen, Voice Recognition, Chatbot)     │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

- **Repository Pattern**: Abstracts database operations
- **Service Layer Pattern**: Encapsulates business logic
- **Dependency Injection**: Loose coupling between layers
- **Factory Pattern**: Creating test modules and content
- **Strategy Pattern**: Different scoring algorithms per module type

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| TypeScript | Type-safe JavaScript |
| Express.js | Web framework |
| Prisma | ORM for database access |
| PostgreSQL | Primary database |
| JWT | Authentication tokens |
| Zod | Request validation |
| Winston | Logging |
| OpenAI API | AI content generation & chatbot |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| TypeScript | Type-safe JavaScript |
| Vite | Build tool & dev server |
| React Router | Client-side routing |
| TanStack Query | Server state management |
| Zustand | Client state management |
| Tailwind CSS | Utility-first styling |
| React Hook Form | Form handling |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| PostgreSQL | Relational database |
| pgAdmin | Database management UI |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PersonalizedAI
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```

3. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

4. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - pgAdmin: http://localhost:5050 (admin@admin.com / admin)

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/personalizedai

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# External Services
AI_ANALYSIS_SERVICE_URL=http://localhost:5001
AI_CONTENT_SERVICE_URL=http://localhost:5002
VOICE_RECOGNITION_SERVICE_URL=http://localhost:5003
CHATBOT_SERVICE_URL=http://localhost:5004
NOTIFICATION_SERVICE_URL=http://localhost:5005

# OpenAI (fallback for AI features)
OPENAI_API_KEY=your-openai-api-key
```

## 📁 Project Structure

```
PersonalizedAI/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── src/
│   │   ├── config/                # Configuration
│   │   │   ├── database.ts        # Prisma client
│   │   │   └── environment.ts     # Environment variables
│   │   ├── controllers/           # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── test.controller.ts
│   │   │   └── ...
│   │   ├── middleware/            # Express middleware
│   │   │   ├── auth.ts            # JWT authentication
│   │   │   ├── errorHandler.ts    # Global error handling
│   │   │   ├── requestLogger.ts   # Request logging
│   │   │   └── validate.ts        # Request validation
│   │   ├── models/                # TypeScript types
│   │   │   ├── user.types.ts
│   │   │   ├── test.types.ts
│   │   │   └── ...
│   │   ├── repositories/          # Database operations
│   │   │   ├── user.repository.ts
│   │   │   ├── test.repository.ts
│   │   │   └── ...
│   │   ├── routes/                # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   └── ...
│   │   ├── services/              # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── test.service.ts
│   │   │   └── external/          # External service clients
│   │   │       ├── aiAnalysis.service.ts
│   │   │       ├── aiContent.service.ts
│   │   │       ├── chatbot.service.ts
│   │   │       └── ...
│   │   ├── utils/                 # Utilities
│   │   │   ├── logger.ts          # Winston logger
│   │   │   ├── response.ts        # API response helpers
│   │   │   └── validators.ts      # Zod schemas
│   │   └── index.ts               # App entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/            # React components
│   │   │   └── layouts/           # Layout components
│   │   ├── pages/                 # Page components
│   │   │   ├── auth/              # Login, Register, etc.
│   │   │   ├── student/           # Student pages
│   │   │   ├── teacher/           # Teacher pages
│   │   │   └── admin/             # Admin pages
│   │   ├── services/              # API clients
│   │   ├── stores/                # Zustand stores
│   │   ├── types/                 # TypeScript types
│   │   ├── utils/                 # Utility functions
│   │   ├── App.tsx                # Main app with routing
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docker-compose.yml
├── project.md                     # Project specification
└── README.md                      # This file
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user profile |
| PUT | `/api/users/me` | Update profile |
| PUT | `/api/users/me/password` | Change password |

### Test Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tests/placement` | Get placement test |
| GET | `/api/tests/:id` | Get test by ID |
| POST | `/api/tests/:id/submit` | Submit test answers |
| GET | `/api/tests/:id/results` | Get test results |

### Content Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/content/topics` | List all topics |
| GET | `/api/content/topics/:id` | Get topic details |
| GET | `/api/content/:id` | Get content item |
| GET | `/api/content/lesson-plan` | Get personalized lesson plan |

### Progress Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/progress` | Get student progress |
| PUT | `/api/progress/content/:id` | Update content progress |
| GET | `/api/progress/analytics` | Get progress analytics |

### Assignment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignments` | List assignments |
| GET | `/api/assignments/:id` | Get assignment details |
| POST | `/api/assignments/:id/submit` | Submit assignment |

### Message Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/inbox` | Get inbox messages |
| GET | `/api/messages/sent` | Get sent messages |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/:id/read` | Mark as read |

### Chatbot Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chatbot/sessions` | Get chat sessions |
| POST | `/api/chatbot/sessions` | Create new session |
| POST | `/api/chatbot/sessions/:id/messages` | Send message |

### Reward Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rewards` | Get student rewards |
| GET | `/api/rewards/leaderboard` | Get leaderboard |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Get system statistics |
| GET | `/api/admin/users` | List all users |
| POST | `/api/admin/users` | Create user |
| PUT | `/api/admin/users/:id` | Update user |
| DELETE | `/api/admin/users/:id` | Delete user |
| PUT | `/api/admin/maintenance` | Toggle maintenance mode |

## 🗄️ Database Schema

### Core Entities

- **User**: Students, teachers, and admins
- **Test/TestModule/Question**: Placement and progress tests
- **TestResult/ModuleResult**: Test scores and analysis
- **Topic/Content**: Learning materials organized hierarchically
- **LessonPlan**: Personalized learning paths
- **Progress/ContentProgress**: Student learning progress
- **Assignment/StudentAssignment**: Teacher-assigned work
- **Message/Announcement**: Communication system
- **ChatSession/ChatMessage**: AI chatbot conversations
- **Reward/StudentReward**: Gamification elements
- **PointTransaction**: Points history

See [backend/prisma/schema.prisma](backend/prisma/schema.prisma) for the complete schema.

## 👩‍💻 Development Guide

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Database Migrations
```bash
cd backend

# Create a migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset
```

### Code Style
- ESLint for linting
- Prettier for formatting
- TypeScript strict mode enabled

### Git Workflow
1. Create feature branch from `main`
2. Make changes with descriptive commits
3. Open pull request for review
4. Merge after approval

## 🔌 External Services

The system integrates with several external services:

| Service | Purpose | Fallback |
|---------|---------|----------|
| AI Analysis Engine | Analyze test responses | Basic scoring |
| AI Content Engine | Generate personalized content | Static content |
| Voice Recognition | Process speaking tests | Manual review |
| Chatbot Service | AI tutoring conversations | OpenAI API |
| Notification Service | Email/push notifications | None |

These services can be mocked for local development. In production, they should be deployed as separate microservices or use third-party APIs.

## 📄 License

This project is developed for educational purposes as part of the SENG 321 course at Ankara Science University.

---

**Built with ❤️ for personalized learning**
