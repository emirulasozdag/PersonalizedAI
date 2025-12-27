import { Download } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Reports</h1>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {[
          { title: 'User Statistics', description: 'Registration and activity trends' },
          { title: 'Learning Progress', description: 'Student progress analytics' },
          { title: 'Content Usage', description: 'Most popular content and engagement' },
          { title: 'System Performance', description: 'API response times and uptime' },
        ].map((report, i) => (
          <div key={i} className="card">
            <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{report.description}</p>
            <button className="btn-outline">
              <Download className="w-4 h-4 mr-2" /> Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
