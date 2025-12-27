import { useState } from 'react';
import { Inbox, Send, Mail } from 'lucide-react';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent'>('inbox');
  
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Messages</h1>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('inbox')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            activeTab === 'inbox' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Inbox className="w-4 h-4" /> Inbox
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            activeTab === 'sent' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Send className="w-4 h-4" /> Sent
        </button>
      </div>
      
      <div className="card">
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No messages in your {activeTab}</p>
        </div>
      </div>
    </div>
  );
}
