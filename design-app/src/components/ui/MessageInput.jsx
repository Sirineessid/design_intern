import React, { useState } from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex items-center gap-2 p-2 rounded-full bg-gray-100 border border-gray-200">
      <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition">
        <Paperclip size={20} />
      </button>
      
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type message..."
        className="flex-grow px-2 py-2 bg-transparent border-none focus:outline-none"
      />
      
      <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition">
        <Smile size={20} />
      </button>
      
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`p-2 rounded-full ${message.trim() ? 'bg-brand-blue text-white' : 'bg-gray-300 text-gray-500'} transition-all duration-200`}
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
