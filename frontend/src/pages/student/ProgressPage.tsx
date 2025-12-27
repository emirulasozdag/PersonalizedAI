export default function ProgressPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">My Progress</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Skill Breakdown</h2>
          <div className="space-y-4">
            {['Reading', 'Writing', 'Listening', 'Speaking'].map((skill, i) => (
              <div key={skill}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{skill}</span>
                  <span className="text-sm font-medium">{60 + i * 10}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${60 + i * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-500">Activity chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
