export default function LessonsPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">My Lessons</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Grammar', 'Vocabulary', 'Reading', 'Writing', 'Listening', 'Speaking'].map((topic) => (
          <div key={topic} className="card-hover">
            <h3 className="font-semibold text-gray-900 mb-2">{topic}</h3>
            <p className="text-sm text-gray-500 mb-4">12 lessons • 4 hours</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
