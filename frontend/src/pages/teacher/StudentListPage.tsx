export default function StudentListPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Students</h1>
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Level</th>
              <th className="text-left py-3 px-4">Progress</th>
              <th className="text-left py-3 px-4">Last Active</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={4} className="text-center py-8 text-gray-500">No students found</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
