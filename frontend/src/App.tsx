import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';

// Layouts
import MainLayout from '@components/layouts/MainLayout';
import AuthLayout from '@components/layouts/AuthLayout';
import AdminLayout from '@components/layouts/AdminLayout';

// Auth Pages
import LoginPage from '@pages/auth/LoginPage';
import RegisterPage from '@pages/auth/RegisterPage';
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage';

// Student Pages
import DashboardPage from '@pages/student/DashboardPage';
import PlacementTestPage from '@pages/student/PlacementTestPage';
import LessonsPage from '@pages/student/LessonsPage';
import LessonDetailPage from '@pages/student/LessonDetailPage';
import ProgressPage from '@pages/student/ProgressPage';
import AssignmentsPage from '@pages/student/AssignmentsPage';
import ChatbotPage from '@pages/student/ChatbotPage';
import RewardsPage from '@pages/student/RewardsPage';
import MessagesPage from '@pages/student/MessagesPage';
import ProfilePage from '@pages/student/ProfilePage';

// Teacher Pages
import TeacherDashboardPage from '@pages/teacher/TeacherDashboardPage';
import StudentListPage from '@pages/teacher/StudentListPage';
import StudentDetailPage from '@pages/teacher/StudentDetailPage';
import ContentManagementPage from '@pages/teacher/ContentManagementPage';
import AssignmentManagementPage from '@pages/teacher/AssignmentManagementPage';
import AnnouncementsPage from '@pages/teacher/AnnouncementsPage';
import AnalyticsPage from '@pages/teacher/AnalyticsPage';

// Admin Pages
import AdminDashboardPage from '@pages/admin/AdminDashboardPage';
import UserManagementPage from '@pages/admin/UserManagementPage';
import SystemSettingsPage from '@pages/admin/SystemSettingsPage';
import ReportsPage from '@pages/admin/ReportsPage';

// Common Pages
import NotFoundPage from '@pages/NotFoundPage';

// Protected Route Component
function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

// Public Route Component (redirect if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (isAuthenticated && user) {
    // Redirect based on role
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'TEACHER':
        return <Navigate to="/teacher" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
      </Route>
      
      {/* Student Routes */}
      <Route element={<ProtectedRoute roles={['STUDENT']}><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/placement-test" element={<PlacementTestPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:id" element={<LessonDetailPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      
      {/* Teacher Routes */}
      <Route element={<ProtectedRoute roles={['TEACHER']}><MainLayout /></ProtectedRoute>}>
        <Route path="/teacher" element={<TeacherDashboardPage />} />
        <Route path="/teacher/students" element={<StudentListPage />} />
        <Route path="/teacher/students/:id" element={<StudentDetailPage />} />
        <Route path="/teacher/content" element={<ContentManagementPage />} />
        <Route path="/teacher/assignments" element={<AssignmentManagementPage />} />
        <Route path="/teacher/announcements" element={<AnnouncementsPage />} />
        <Route path="/teacher/analytics" element={<AnalyticsPage />} />
      </Route>
      
      {/* Admin Routes */}
      <Route element={<ProtectedRoute roles={['ADMIN']}><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/settings" element={<SystemSettingsPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
