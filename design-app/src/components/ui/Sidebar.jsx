import React from 'react';
import { Video, Mail, BarChart2, Calendar, Settings, Users, GridIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ activeItem = 'video', onItemClick }) => {
  const items = [
    { id: 'dashboard', icon: GridIcon, label: 'Dashboard' },
    { id: 'video', icon: Video, label: 'Video Calls' },
    { id: 'mail', icon: Mail, label: 'Messages' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'users', icon: Users, label: 'Teams' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="h-full w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 animate-fade-in">
      <div className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="white"/>
            <path d="M16.9 7.1L7.1 16.9C6.8 17.2 6.2 17.2 5.9 16.9C5.6 16.6 5.6 16 5.9 15.7L15.7 5.9C16 5.6 16.6 5.6 16.9 5.9C17.2 6.2 17.2 6.8 16.9 7.1Z" fill="white"/>
          </svg>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center space-y-6">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "sidebar-icon relative group",
                isActive ? "text-brand-blue" : "text-gray-500 hover:text-gray-700"
              )}
              aria-label={item.label}
            >
              <Icon size={22} />
              
              {isActive && (
                <span className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1.5 h-1/3 bg-brand-blue rounded-l-full" />
              )}
              
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
