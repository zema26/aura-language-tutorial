
import React, { useState, useRef, useEffect } from 'react';
import { askAuraBot } from '../services/geminiService';
import type { ChatMessage } from '../types';

const AuraBotView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Hello! I am AuraBot. Ask me any questions you have about the Aura programming language.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const botResponse = await askAuraBot(messages, userInput);
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Basic markdown to HTML conversion
  const renderMessageText = (text: string) => {
    let html = text
      .replace(/```aura\n([\s\S]*?)\n```/g, (match, p1) => `<pre class="bg-aura-primary p-3 my-2 rounded-md font-mono text-sm overflow-x-auto"><code>${p1.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`)
      .replace(/`([^`]+)`/g, '<code class="bg-aura-primary text-aura-secondary px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
    return { __html: html };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-2">AuraBot AI Assistant</h1>
      <p className="text-aura-text-dim mb-6">Your personal guide to the Aura language, powered by Gemini.</p>

      <div className="flex-1 bg-aura-surface rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-aura-secondary flex-shrink-0 flex items-center justify-center font-bold">A</div>}
              <div className={`max-w-lg p-3 rounded-lg ${msg.sender === 'bot' ? 'bg-aura-primary' : 'bg-aura-accent'}`}>
                <p className="text-sm" dangerouslySetInnerHTML={renderMessageText(msg.text)}></p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-aura-secondary flex-shrink-0 flex items-center justify-center font-bold">A</div>
              <div className="max-w-lg p-3 rounded-lg bg-aura-primary">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-aura-text-dim rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-aura-text-dim rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-aura-text-dim rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-aura-primary/50 border-t border-aura-primary">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about Aura syntax, e.g., 'how do for loops work?'"
              className="flex-1 bg-aura-surface border border-aura-primary rounded-lg p-3 text-aura-text focus:outline-none focus:ring-2 focus:ring-aura-accent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="px-6 py-3 bg-aura-secondary text-white font-bold rounded-lg hover:bg-red-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuraBotView;
