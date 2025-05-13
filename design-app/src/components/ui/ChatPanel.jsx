import React, { useState } from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { useSocket } from '../../context/SocketContext';
import { cn } from '../../lib/utils';

const ChatPanel = ({ 
  roomId,
  messages = [],
  onSendMessage,
  participants = [],
  currentUser
}) => {
  const [input, setInput] = useState('');
  const { socket } = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = React.useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    
    // Handle typing indicator
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing', { roomId, user: currentUser });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket?.emit('stopTyping', { roomId, user: currentUser });
    }, 1000);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const message = {
        text: input.trim(),
        sender: currentUser.name,
        time: new Date().toISOString(),
        avatar: currentUser.avatar
      };
      
      onSendMessage(message);
      socket?.emit('chatMessage', { roomId, message });
      setInput('');
      setIsTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble
            key={msg.id || index}
            message={msg.text || msg.message}
            sender={msg.sender}
            time={msg.time}
            isCurrentUser={msg.sender === currentUser?.name}
            avatar={msg.avatar}
            status={msg.status}
          />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Someone is typing</span>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm"
          />
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Smile size={20} />
          </button>
          <button 
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={cn(
              "p-2 rounded-full transition-colors",
              input.trim() 
                ? "text-blue-600 hover:bg-blue-50" 
                : "text-gray-400"
            )}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
