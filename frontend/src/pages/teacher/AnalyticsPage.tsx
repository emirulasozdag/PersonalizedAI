export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Student Performance</h2>
          <p className="text-gray-500">Charts and analytics will be displayed here</p>
        </div>
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Content Engagement</h2>
          <p className="text-gray-500">Engagement metrics will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
