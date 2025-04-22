import React, { useState } from 'react';
import { ChevronRight, Users } from 'lucide-react';
import MessageBubble from './MessageBubble.jsx';
import MessageInput from './MessageInput.jsx';
import Avatar from './Avatar.jsx';
import { cn } from '../../lib/utils';

const ChatPanel = ({
  title,
  messages,
  onSendMessage,
  showParticipants,
  onToggleParticipants
}) => {
  const [activeTab, setActiveTab] = useState('messages');

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 shadow-lg animate-slide-in-right">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">{title}</h2>
        
        <div className="flex items-center">
          <button 
            onClick={() => setActiveTab('messages')}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              activeTab === 'messages' ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
            )}
          >
            Messages
          </button>
          
          <button 
            onClick={() => setActiveTab('participants')}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              activeTab === 'participants' ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
            )}
          >
            Participants
          </button>
        </div>
        
        <button
          onClick={onToggleParticipants}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={20} className={`transform transition-transform ${showParticipants ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'messages' ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.message}
                sender={message.sender}
                time={message.time}
                isCurrentUser={message.isCurrentUser}
                avatar={message.avatar}
                status={message.status}
              />
            ))}
            
            <div className="flex items-center gap-2 p-2 text-brand-teal">
              <span className="text-xs">Merin Typing...</span>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Alex Johnson" 
                  status="online" 
                  size="sm" 
                />
                <div>
                  <p className="text-sm font-medium">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Host</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Speaking
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Sophia Williams" 
                  status="online" 
                  size="sm" 
                />
                <div>
                  <p className="text-sm font-medium">Sophia Williams</p>
                  <p className="text-xs text-gray-500">Co-host</p>
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Presenting
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar 
                  src="https://randomuser.me/api/portraits/men/22.jpg" 
                  alt="Ethan Brown" 
                  status="online" 
                  size="sm" 
                />
                <div>
                  <p className="text-sm font-medium">Ethan Brown</p>
                  <p className="text-xs text-gray-500">Participant</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                Muted
              </span>
            </div>
            
            <div className="mt-6 p-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Absent</p>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  3
                </span>
              </div>
              
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar 
                    src="https://randomuser.me/api/portraits/women/67.jpg" 
                    alt="Emily Davis" 
                    status="offline" 
                    size="sm" 
                  />
                  <p className="text-sm text-gray-500">Emily Davis</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar 
                    src="https://randomuser.me/api/portraits/men/78.jpg" 
                    alt="Michael Wilson" 
                    status="offline" 
                    size="sm" 
                  />
                  <p className="text-sm text-gray-500">Michael Wilson</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar 
                    src="https://randomuser.me/api/portraits/women/54.jpg" 
                    alt="Jessica Taylor" 
                    status="offline" 
                    size="sm" 
                  />
                  <p className="text-sm text-gray-500">Jessica Taylor</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {activeTab === 'messages' && (
        <div className="p-4 border-t border-gray-200">
          <MessageInput onSend={onSendMessage} />
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
