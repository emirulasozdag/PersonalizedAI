import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hello! I\'m your AI English tutor. How can I help you today? You can ask me questions about grammar, vocabulary, or any English topic you\'re studying.' }
  ]);
  
  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    // TODO: Send to API and get response
    setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m processing your question. This feature will be connected to the AI backend.' }]);
    setMessage('');
  };
  
  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
      <div className="card flex-1 flex flex-col">
        <h1 className="text-xl font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary-600" />
          AI English Tutor
        </h1>
        
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-primary-100' : 'bg-gray-100'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about English..."
            className="input flex-1"
          />
          <button onClick={handleSend} className="btn-primary">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
