import React from 'react';
import { ChevronLeft, Signal, MessageSquare, Video, Monitor, Settings, Mic } from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ meetingTitle, teamName, onCallCount, absentCount }) => {
  const items = [
    { id: 'signal', icon: Signal, label: 'Signal' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'video', icon: Video, label: 'Video', active: true },
    { id: 'screen-share', icon: Monitor, label: 'Screen Share' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'microphone', icon: Mic, label: 'Microphone' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="white"/>
            <path d="M16.9 7.1L7.1 16.9C6.8 17.2 6.2 17.2 5.9 16.9C5.6 16.6 5.6 16 5.9 15.7L15.7 5.9C16 5.6 16.6 5.6 16.9 5.9C17.2 6.2 17.2 6.8 16.9 7.1Z" fill="white"/>
          </svg>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-medium">{meetingTitle}</h1>
          <div className="text-xs font-medium text-purple-800 bg-purple-100 px-2 py-1 rounded-full inline-block">{teamName}</div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="text-green-500 text-sm">On-Call Participants: {onCallCount}</div>
        <div className="text-red-500 text-sm">Absent Participants: {absentCount}</div>
      </div>
      <div className="p-4 flex flex-col space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.active || false;
          return (
            <div key={item.id} className="flex items-center space-x-2">
              <button
                className={cn(
                  "relative group",
                  isActive ? "bg-green-100 text-green-600 font-semibold" : "text-gray-500 hover:text-gray-700"
                )}
                aria-label={item.label}
              >
                <Icon size={20} />
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 bg-opacity-90 backdrop-blur-sm shadow-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </span>
              </button>
              {item.id === 'microphone' && (
                <input type="range" min="0" max="100" value="50" className="w-24 transform -rotate-90" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
