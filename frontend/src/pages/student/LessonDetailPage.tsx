import { useParams } from 'react-router-dom';

export default function LessonDetailPage() {
  const { id } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-4">
          Lesson Details
        </h1>
        <p className="text-gray-600">Viewing lesson: {id}</p>
        {/* Lesson content will be loaded here */}
      </div>
    </div>
  );
}
