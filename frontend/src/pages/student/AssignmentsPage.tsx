export default function AssignmentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Assignments</h1>
      <div className="space-y-4">
        {['Pending', 'In Progress', 'Submitted', 'Graded'].map((status) => (
          <div key={status} className="card">
            <h2 className="font-semibold text-gray-900 mb-3">{status}</h2>
            <p className="text-gray-500">No {status.toLowerCase()} assignments</p>
          </div>
        ))}
      </div>
    </div>
  );
}
