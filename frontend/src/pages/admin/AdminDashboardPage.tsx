import { Users, Server, Activity, AlertTriangle } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">System Overview</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, label: 'Total Users', value: '156', color: 'text-blue-600' },
          { icon: Server, label: 'System Health', value: '99.9%', color: 'text-green-600' },
          { icon: Activity, label: 'Active Sessions', value: '42', color: 'text-purple-600' },
          { icon: AlertTriangle, label: 'Pending Issues', value: '3', color: 'text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="card">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-500">System activity log will be displayed here</p>
        </div>
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">System Metrics</h2>
          <p className="text-gray-500">Performance metrics will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
