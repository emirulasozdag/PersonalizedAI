import { Plus, Search } from 'lucide-react';

export default function UserManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">User Management</h1>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add User</button>
      </div>
      
      <div className="card mb-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search users..." className="input pl-10" />
          </div>
          <select className="input w-40">
            <option>All Roles</option>
            <option>Students</option>
            <option>Teachers</option>
            <option>Admins</option>
          </select>
        </div>
      </div>
      
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={4} className="text-center py-8 text-gray-500">No users found</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
