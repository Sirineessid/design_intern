import React from 'react';
import Avatar from './Avatar';
import { format, isValid, parseISO } from 'date-fns';

const MessageBubble = ({
  message,
  sender,
  time,
  isCurrentUser,
  avatar,
  status
}) => {
  // Improved time formatting logic
  const formattedTime = time ? (() => {
    try {
      // Try parsing as ISO string first
      const date = typeof time === 'string' ? parseISO(time) : new Date(time);
      return isValid(date) ? format(date, 'h:mm a') : '';
    } catch (error) {
      console.warn('Invalid time value:', time);
      return '';
    }
  })() : '';

  return (
    <div className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <Avatar
        src={avatar}
        alt={sender}
        size="sm"
        status={status}
        className={isCurrentUser ? 'ml-2' : 'mr-2'}
      />
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs text-gray-500 ${isCurrentUser ? 'order-2' : ''}`}>
            {sender}
          </span>
          {formattedTime && <span className="text-xs text-gray-400">{formattedTime}</span>}
        </div>
        <div
          className={`
            max-w-[70%] px-4 py-2 rounded-2xl
            ${isCurrentUser
              ? 'bg-blue-600 text-white rounded-tr-sm'
              : 'bg-gray-100 text-gray-900 rounded-tl-sm'
            }
          `}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
