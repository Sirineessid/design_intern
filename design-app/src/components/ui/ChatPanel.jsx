import React, { useState } from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';
import MessageBubble from './MessageBubble.jsx';
import MessageInput from './MessageInput.jsx';
import Avatar from './Avatar.jsx';
import { cn } from '../../lib/utils';

const ChatPanel = ({ title = "Group Chat", messages, onSendMessage, participants = [] }) => {
  const [activeTab, setActiveTab] = useState('messages');

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border shadow-md">
      {/* Tabs Bar */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('messages')}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md",
              activeTab === 'messages' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:text-green-600'
            )}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('participants')}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md",
              activeTab === 'participants' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:text-green-600'
            )}
          >
            Participants
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {activeTab === 'messages' && (
          <>
            {/* Messages */}
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg.message}
                sender={msg.sender}
                time={msg.time}
                isCurrentUser={msg.isCurrentUser}
                avatar={msg.avatar}
                status={msg.status}
              />
            ))}

            {/* Typing Indicator */}
            <div className="flex items-center gap-2 mt-4 text-green-600">
              <span className="text-sm">Merin Typing...</span>
              <div className="typing-indicator flex gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'participants' && (
          <>
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                <Avatar src={participant.avatar} alt={participant.name} size="sm" status={participant.status} />
                <div>
                  <p className="text-sm font-medium">{participant.name}</p>
                  <p className="text-xs text-gray-400">{participant.status === 'offline' ? 'Absent' : 'Online'}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Message Input */}
      {activeTab === 'messages' && (
        <div className="p-4 border-t">
          <MessageInput onSend={onSendMessage} />
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
