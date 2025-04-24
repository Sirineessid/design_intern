import React from 'react';
import Badge from './Badge.jsx';
import Avatar from './Avatar.jsx';
import { UserPlus, User, RefreshCw, UserX, Mail } from 'lucide-react';
/*import { Button } from './ui/button';*/ // Uncommented if you want to use the custom Button component.
import { toast } from 'sonner';

const ParticipantsList = ({
  onCall = [],
  absent = {},
  onAddUser,
  onRefresh,
  onSendReminder,
  isLoading // Added for the loading state
}) => {
  const handleSendReminder = () => {
    if (onSendReminder) {
      onSendReminder();
    } else {
      toast("Reminders sent to absent participants", {
        description: `${absent.length} participants have been notified`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-600" />
          <h3 className="text-sm font-medium text-gray-800">On-Call Participants</h3>
          <Badge className="ml-2 select-none" variant="success">{onCall.length}</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Refresh participants list"
              title="Refresh participants list"
            >
              <RefreshCw size={18} className="text-gray-600" />
            </button>
          )}
          
          <button 
            onClick={onAddUser}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Add participant"
            title="Add participant to call"
          >
            <UserPlus size={18} className="text-brand-blue" />
          </button>
        </div>
      </div>

      {/* Loading state for participants */}
      {isLoading ? (
        <div className="text-sm text-gray-400">Loading participants...</div>
      ) : (
        <div className="space-y-3">
          {[...onCall].sort((a, b) => a.name.localeCompare(b.name)).map(participant => (
            <div key={participant.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <Avatar src={participant.avatar} alt={participant.name} status={participant.status} size="sm" />
                <span className="text-sm font-medium">{participant.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {participant.isPresenting && (
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    Presenting
                  </span>
                )}
                
                {participant.isMuted && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15Z" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12H6M18 12H21M6.5 19H17.5" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 2L22 22" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                
                {participant.isVideoOff && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 15L21 17.5V6.5L14.5 9" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="6" width="12" height="12" rx="2" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 2L22 22" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {absent.length > 0 && (
        <>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <UserX size={18} className="text-gray-600" />
              <h3 className="text-sm font-medium text-gray-800">Absent Participants</h3>
              <Badge variant="danger" className="ml-2 select-none">{absent.length}</Badge>
            </div>
            
            {/* Use button element here for consistency */}
            <button 
              onClick={handleSendReminder}
              className="text-xs flex items-center gap-1 border rounded px-2 py-1 text-gray-700 hover:bg-gray-100 transition"
            >
              <Mail size={14} />
              Send Reminder
            </button>
          </div>
          
          <div className="space-y-3">
            {absent.map(participant => (
              <div key={`${participant.id}-${participant.name}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Avatar src={participant.avatar} alt={participant.name} status="offline" size="sm" />
                <span className="text-sm font-medium text-gray-500">{participant.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ParticipantsList;
