import { useParams } from 'react-router-dom';

export default function StudentDetailPage() {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Student Details</h1>
      <div className="card">
        <p className="text-gray-600">Viewing student: {id}</p>
      </div>
    </div>
  );
}
