import { Users, BookOpen, ClipboardList, TrendingUp } from 'lucide-react';

export default function TeacherDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, label: 'Total Students', value: '24' },
          { icon: BookOpen, label: 'Active Lessons', value: '12' },
          { icon: ClipboardList, label: 'Pending Reviews', value: '8' },
          { icon: TrendingUp, label: 'Avg. Progress', value: '67%' },
        ].map((stat, i) => (
          <div key={i} className="card">
            <stat.icon className="w-8 h-8 text-primary-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Submissions</h2>
          <p className="text-gray-500">No recent submissions to review</p>
        </div>
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Student Activity</h2>
          <p className="text-gray-500">Activity chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
