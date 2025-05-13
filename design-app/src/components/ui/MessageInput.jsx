import React from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';

const MessageInput = ({ onSend, onInputChange, inputValue }) => {
  const handleSend = () => {
    if (inputValue.trim()) {
      onSend();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex items-center gap-2 p-2 bg-gray-100 rounded-full shadow-sm">
      <button className="text-gray-500 hover:text-blue-600">
        <Paperclip size={20} />
      </button>

      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 bg-transparent outline-none px-2"
      />

      <button className="text-gray-500 hover:text-blue-600">
        <Smile size={20} />
      </button>

      <button
        onClick={handleSend}
        disabled={!inputValue.trim()}
        className={`p-2 rounded-full ${
          inputValue.trim() ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
        } transition duration-200`}
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
