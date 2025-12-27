import { Save } from 'lucide-react';

export default function SystemSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">System Settings</h1>
      
      <div className="space-y-6">
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Application Name</label>
              <input type="text" className="input" defaultValue="PersonalizedAI" />
            </div>
            <div>
              <label className="label">Support Email</label>
              <input type="email" className="input" defaultValue="support@example.com" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Maintenance Mode</h2>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded border-gray-300 h-5 w-5" />
            <span>Enable maintenance mode</span>
          </label>
        </div>
        
        <button className="btn-primary"><Save className="w-4 h-4 mr-2" /> Save Settings</button>
      </div>
    </div>
  );
}
