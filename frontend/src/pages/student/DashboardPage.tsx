import { BookOpen, TrendingUp, Trophy, ClipboardList, Clock, Target } from 'lucide-react';
import { useAuthStore } from '@stores/authStore';
import { getLevelColor, formatDuration } from '@utils/helpers';

export default function DashboardPage() {
  const { user } = useAuthStore();
  
  // TODO: Fetch real data from API
  const stats = {
    currentLevel: user?.languageLevel || 'B1',
    totalStudyTime: 1250, // minutes
    completedLessons: 24,
    currentStreak: user?.dailyStreak || 7,
    weeklyGoalProgress: 65,
    upcomingAssignments: 3,
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <h1 className="text-2xl font-heading font-bold mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-primary-100">
          Keep up the great work! You're on a {stats.currentStreak}-day streak.
        </p>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Level</p>
              <p className={`inline-block px-2 py-0.5 rounded text-sm font-medium ${getLevelColor(stats.currentLevel)}`}>
                {stats.currentLevel}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Study Time</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDuration(stats.totalStudyTime)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Lessons Done</p>
              <p className="text-lg font-semibold text-gray-900">{stats.completedLessons}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Points</p>
              <p className="text-lg font-semibold text-gray-900">{user?.totalPoints || 0}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content sections */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Weekly Goal
          </h2>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{stats.weeklyGoalProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-primary-600 h-3 rounded-full transition-all"
              style={{ width: `${stats.weeklyGoalProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Complete 5 more lessons to reach your weekly goal!
          </p>
        </div>
        
        {/* Upcoming Assignments */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary-600" />
            Upcoming Assignments
          </h2>
          {stats.upcomingAssignments > 0 ? (
            <div className="space-y-3">
              {/* Placeholder assignments */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Assignment {i}</p>
                    <p className="text-sm text-gray-500">Due in {i} day{i > 1 ? 's' : ''}</p>
                  </div>
                  <span className="badge-warning">Pending</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No upcoming assignments. Great job staying on top of things!
            </p>
          )}
        </div>
      </div>
      
      {/* Continue Learning */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {['Grammar Basics', 'Vocabulary Building', 'Listening Practice'].map((topic, i) => (
            <div key={i} className="card-hover bg-gray-50 border-2 border-transparent hover:border-primary-200">
              <h3 className="font-medium text-gray-900 mb-2">{topic}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${30 + i * 20}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">{30 + i * 20}% complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
