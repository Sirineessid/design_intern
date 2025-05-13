import React from 'react';
import { RefreshCw, Mail, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import Avatar from './Avatar';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

const ParticipantsList = ({ 
  roomId,
  participants = [],
  currentUser,
  onRefresh,
  onSendReminder
}) => {
  const { socket } = useSocket();
  const activeParticipants = participants.filter(p => p.status === 'online');
  const absentParticipants = participants.filter(p => p.status === 'offline');

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      socket?.emit('refreshParticipants', { roomId });
      toast.info('Refreshing participants list...');
    }
  };

  const handleSendReminder = () => {
    if (onSendReminder) {
      onSendReminder();
    } else {
      socket?.emit('sendReminder', { roomId });
      toast.success('Reminders sent to absent participants');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with refresh and reminder buttons */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw size={16} />
            Refresh list
          </button>

          {absentParticipants.length > 0 && (
            <button
              onClick={handleSendReminder}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Mail size={16} />
              Send reminder
            </button>
          )}
        </div>
      </div>

      {/* Participants list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {/* Active participants */}
          {activeParticipants.map((participant) => (
            <div 
              key={participant.id} 
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors",
                participant.isSpeaking ? "bg-blue-50" : "hover:bg-gray-50"
              )}
            >
              <Avatar 
                src={participant.avatar} 
                alt={participant.name}
                status={participant.status}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {participant.name}
                  {participant.id === currentUser?.id && " (You)"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {participant.isMuted ? (
                    <MicOff size={14} className="text-red-500" />
                  ) : (
                    <Mic size={14} className="text-gray-400" />
                  )}
                  {participant.isVideoOff ? (
                    <VideoOff size={14} className="text-red-500" />
                  ) : (
                    <Video size={14} className="text-gray-400" />
                  )}
                  {participant.isSpeaking && (
                    <span className="text-xs text-blue-600">Speaking</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Absent participants */}
          {absentParticipants.length > 0 && (
            <div className="mt-4">
              <h3 className="px-3 text-sm font-medium text-gray-500 mb-2">
                Absent ({absentParticipants.length})
              </h3>
              {absentParticipants.map((participant) => (
                <div 
                  key={participant.id} 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar 
                    src={participant.avatar} 
                    alt={participant.name}
                    status="offline"
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {participant.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Offline
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsList;
