import React, { useState } from 'react';
import { MessageSquare, Send, Upload } from 'lucide-react';
import axios from 'axios';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your AI assistant. How can I assist you with carbon emissions today? Upload data or enter factory details manually, then switch to Analysis Mode for insights!", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isAnalysisMode, setIsAnalysisMode] = useState(false);
  const [uploadedData, setUploadedData] = useState<string | null>(null);
  const [factoryData, setFactoryData] = useState({
    factoryID: '',
    co2Level: '',
    location: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, message?: string) => {
    e.preventDefault();
    const userMessage = message || input.trim();
    if (!userMessage) return;

    const newMessage = { text: userMessage, isUser: true };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');

    console.log('Sending to backend:', { messages: updatedMessages, isAnalysisMode, uploadedData });

    try {
      const response = await axios.post('http://localhost:8000/api/chatbot/response/', {
        messages: updatedMessages,
        isAnalysisMode,
        uploadedData
      });
      setMessages(prev => [...prev, { text: response.data.reply, isUser: false }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setError('Failed to get response from server. Please try again.');
      setMessages(prev => [...prev, { text: 'Sorry, something went wrong.', isUser: false }]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setUploadedData(text);
        setMessages(prev => [...prev, { text: `Uploaded file: ${file.name}`, isUser: true }]);
        console.log('Uploaded file content:', text);
      };
      reader.onerror = () => {
        setError('Failed to read uploaded file.');
      };
      reader.readAsText(file);
    }
  };

  const formatManualData = () => {
    if (!factoryData.factoryID || !factoryData.co2Level) {
      setError('Please provide Factory ID and CO2 Level.');
      return null;
    }
    const headers = 'FactoryID,CO2Level,Location\n';
    const row = `${factoryData.factoryID},${factoryData.co2Level},${factoryData.location || 'Unknown'}\n`;
    return headers + row;
  };

  const handleFactorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const csvData = formatManualData();
    if (csvData) {
      setUploadedData(csvData);
      setMessages(prev => [...prev, { text: `Manually entered factory data for ${factoryData.factoryID}`, isUser: true }]);
      console.log('Manual data formatted:', csvData);
      setFactoryData({ factoryID: '', co2Level: '', location: '' });
      setError(null);
    } else {
      setMessages(prev => [...prev, { text: 'Please provide Factory ID and CO2 Level.', isUser: false }]);
    }
  };

  const handleFactoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFactoryData(prev => ({ ...prev, [name]: value }));
  };

  const defaultMessages = [
    "What is the CO2 threshold for poor air quality?",
    "Tell me about the CarbonSens team.",
    "How does the MQ-4 sensor work?",
    "What's the input?"
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">AI Assistant</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Get instant answers to your carbon emission questions
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Chatbox (Left Side) */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="h-[500px] overflow-y-auto mb-4">
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
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="default-messages mb-4 flex justify-center gap-4 flex-wrap">
              {defaultMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={(e) => handleSubmit(e, msg)}
                  className="default-button px-4 py-2"
                >
                  {msg}
                </button>
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

        {/* Control Panel (Right Side) */}
        <div className="w-full lg:w-1/4 p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Controls</h2>
          <div className="space-y-4">
            <div>
              <input
                type="file"
                accept=".txt,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg cursor-pointer hover:bg-emerald-200 w-full text-center"
              >
                <Upload size={20} className="mr-2" /> Upload Data
              </label>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Enter Factory Data</h3>
              <form onSubmit={handleFactorySubmit} className="space-y-3">
                <input
                  type="text"
                  name="factoryID"
                  value={factoryData.factoryID}
                  onChange={handleFactoryInputChange}
                  placeholder="Factory ID"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <input
                  type="number"
                  name="co2Level"
                  value={factoryData.co2Level}
                  onChange={handleFactoryInputChange}
                  placeholder="CO2 Level (ppm)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={factoryData.location}
                  onChange={handleFactoryInputChange}
                  placeholder="Location (optional)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Submit Factory Data
                </button>
              </form>
            </div>

            {/* Toggle Switch for Analysis Mode */}
            <div className="flex items-center justify-between">
              <span className="text-md font-semibold text-gray-800 dark:text-gray-200">
                Analysis Mode
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnalysisMode}
                  onChange={() => setIsAnalysisMode(!isAnalysisMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:bg-emerald-600 transition-colors">
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${isAnalysisMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {isAnalysisMode ? 'On' : 'Off'}
                </span>
              </label>
            </div>
          </div>
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

      <style jsx>{`
        .default-messages {
          margin: 10px 0;
        }
        .default-button {
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 5px;
          cursor: pointer;
          color: #333;
          transition: background 0.2s;
          white-space: normal;
          text-align: center;
          max-width: 250px;
          word-wrap: break-word;
        }
        .default-button:hover {
          background: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;