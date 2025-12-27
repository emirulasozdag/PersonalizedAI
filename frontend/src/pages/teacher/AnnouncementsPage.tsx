import { Plus } from 'lucide-react';

export default function AnnouncementsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Announcements</h1>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> New Announcement</button>
      </div>
      <div className="card">
        <p className="text-gray-500 text-center py-8">No announcements yet</p>
      </div>
    </div>
  );
}
