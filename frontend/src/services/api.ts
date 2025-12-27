import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@stores/authStore';
import type { User, ApiResponse } from '@/types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && originalRequest && !originalRequest.headers['X-Retry']) {
      try {
        await useAuthStore.getState().refreshToken();
        originalRequest.headers['X-Retry'] = 'true';
        return api(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<{ user: User; accessToken: string }>>('/auth/login', { email, password });
    return data.data!;
  },
  
  register: async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    const { data } = await api.post<ApiResponse<{ user: User; accessToken: string }>>('/auth/register', userData);
    return data.data!;
  },
  
  logout: async () => {
    await api.post('/auth/logout');
  },
  
  refreshToken: async () => {
    const { data } = await api.post<ApiResponse<{ accessToken: string }>>('/auth/refresh');
    return data.data!;
  },
  
  forgotPassword: async (email: string) => {
    await api.post('/auth/forgot-password', { email });
  },
  
  resetPassword: async (token: string, password: string) => {
    await api.post('/auth/reset-password', { token, password });
  },
};

// User Service
export const userService = {
  getProfile: async () => {
    const { data } = await api.get<ApiResponse<User>>('/users/me');
    return data.data!;
  },
  
  updateProfile: async (updates: Partial<User>) => {
    const { data } = await api.put<ApiResponse<User>>('/users/me', updates);
    return data.data!;
  },
  
  changePassword: async (currentPassword: string, newPassword: string) => {
    await api.put('/users/me/password', { currentPassword, newPassword });
  },
};

// Test Service
export const testService = {
  getPlacementTest: async () => {
    const { data } = await api.get('/tests/placement');
    return data.data;
  },
  
  submitTest: async (testId: string, answers: Record<string, unknown>) => {
    const { data } = await api.post(`/tests/${testId}/submit`, { answers });
    return data.data;
  },
  
  getResults: async (testId: string) => {
    const { data } = await api.get(`/tests/${testId}/results`);
    return data.data;
  },
};

// Content Service
export const contentService = {
  getTopics: async (level?: string) => {
    const { data } = await api.get('/content/topics', { params: { level } });
    return data.data;
  },
  
  getTopic: async (topicId: string) => {
    const { data } = await api.get(`/content/topics/${topicId}`);
    return data.data;
  },
  
  getContent: async (contentId: string) => {
    const { data } = await api.get(`/content/${contentId}`);
    return data.data;
  },
  
  getLessonPlan: async () => {
    const { data } = await api.get('/content/lesson-plan');
    return data.data;
  },
};

// Progress Service
export const progressService = {
  getProgress: async () => {
    const { data } = await api.get('/progress');
    return data.data;
  },
  
  updateContentProgress: async (contentId: string, updates: Record<string, unknown>) => {
    const { data } = await api.put(`/progress/content/${contentId}`, updates);
    return data.data;
  },
  
  getAnalytics: async () => {
    const { data } = await api.get('/progress/analytics');
    return data.data;
  },
};

// Assignment Service
export const assignmentService = {
  getAssignments: async () => {
    const { data } = await api.get('/assignments');
    return data.data;
  },
  
  getAssignment: async (assignmentId: string) => {
    const { data } = await api.get(`/assignments/${assignmentId}`);
    return data.data;
  },
  
  submitAssignment: async (assignmentId: string, submission: Record<string, unknown>) => {
    const { data } = await api.post(`/assignments/${assignmentId}/submit`, submission);
    return data.data;
  },
};

// Message Service
export const messageService = {
  getMessages: async (type: 'inbox' | 'sent') => {
    const { data } = await api.get(`/messages/${type}`);
    return data.data;
  },
  
  getMessage: async (messageId: string) => {
    const { data } = await api.get(`/messages/${messageId}`);
    return data.data;
  },
  
  sendMessage: async (message: { recipientId: string; subject: string; body: string }) => {
    const { data } = await api.post('/messages', message);
    return data.data;
  },
  
  markAsRead: async (messageId: string) => {
    await api.put(`/messages/${messageId}/read`);
  },
};

// Chatbot Service
export const chatbotService = {
  getSessions: async () => {
    const { data } = await api.get('/chatbot/sessions');
    return data.data;
  },
  
  createSession: async () => {
    const { data } = await api.post('/chatbot/sessions');
    return data.data;
  },
  
  sendMessage: async (sessionId: string, message: string) => {
    const { data } = await api.post(`/chatbot/sessions/${sessionId}/messages`, { message });
    return data.data;
  },
};

// Reward Service
export const rewardService = {
  getRewards: async () => {
    const { data } = await api.get('/rewards');
    return data.data;
  },
  
  getLeaderboard: async () => {
    const { data } = await api.get('/rewards/leaderboard');
    return data.data;
  },
};

export default api;
