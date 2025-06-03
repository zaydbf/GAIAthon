import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your AI assistant. How can I help you with carbon emissions today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm analyzing your request about carbon emissions. This is a demo response - in the actual implementation, this would be connected to our AI backend.",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">AI Assistant</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Get instant answers to your carbon emission questions
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="h-96 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 ${message.isUser ? 'justify-end' : ''}`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-2">
                    <MessageSquare size={16} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.isUser
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about carbon emissions..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
      <div className="mt-16 text-center">
        <a
          href="/#home"
          className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full font-medium transition-transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default AIAssistant;