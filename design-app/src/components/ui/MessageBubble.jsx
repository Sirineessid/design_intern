import React from 'react';
import { cn } from '@/lib/utils';

const MessageBubble = ({
  message,
  sender,
  time,
  isCurrentUser,
  avatar,
  status = 'sent'
}) => {
  return (
    <div className={cn(
      "flex items-end gap-2 mb-4",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      {!isCurrentUser && avatar && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
          <img src={avatar} alt={sender} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="flex flex-col">
        <div className={cn(
          "message-bubble",
          isCurrentUser ? "message-bubble-sent" : "message-bubble-received"
        )}>
          {message}
        </div>
        
        <div className={cn(
          "text-xs px-2",
          isCurrentUser ? "text-right text-gray-500" : "text-left text-gray-500"
        )}>
          {time}
        </div>
      </div>
      
      {isCurrentUser && status === 'read' && (
        <div className="flex-shrink-0 text-xs text-blue-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12L8 18L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
