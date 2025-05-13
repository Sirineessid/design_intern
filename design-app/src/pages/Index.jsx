import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';
import ParticipantsList from '../components/ui/ParticipantsList';
import VideoCall from '../components/ui/Videocall';
import ChatPanel from '../components/ui/ChatPanel';
import MeetingInfo from '../components/ui/MeetingInfo';
import { useSocket } from '../context/SocketContext';
import { toast } from 'sonner';
import '../index.css';
import { cn } from '../lib/utils';

function Index() {
  const [selectedTab, setSelectedTab] = useState('messages');
  const [callDuration, setCallDuration] = useState('00:00:00');
  const [roomId] = useState('room123');
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const { socket, isConnected } = useSocket();

  // Check authentication
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Current user
  const [currentUser] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || 'https://randomuser.me/api/portraits/women/33.jpg',
    status: 'online',
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
    isSpeaking: false
  });

  // Meeting info
  const [meetingInfo] = useState({
    title: "UI/UX Design weekly update",
    description: "Weekly sync-up meeting to discuss design progress and upcoming tasks",
    scheduledTime: new Date().toISOString(),
    hostName: currentUser.name,
  });

  // Participants state
  const [participants, setParticipants] = useState([
    { 
      id: '2', 
      name: 'Sarah Wilson', 
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg', 
      status: 'online',
      isSpeaking: false, 
      isMuted: false, 
      isVideoOff: false 
    },
    { 
      id: '3', 
      name: 'Michael Johnson', 
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg', 
      status: 'online',
      isSpeaking: false, 
      isMuted: true, 
      isVideoOff: false 
    },
    { 
      id: '4', 
      name: 'James Rodriguez', 
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg', 
      status: 'offline',
      isSpeaking: false, 
      isMuted: false, 
      isVideoOff: true 
    },
    { 
      id: '5', 
      name: 'Emily Brown', 
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg', 
      status: 'online',
      isSpeaking: false, 
      isMuted: true, 
      isVideoOff: false 
    }
  ]);

  // Messages state
  const [messages, setMessages] = useState([]);

  // Socket event handlers
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Join room
    socket.emit('joinRoom', { roomId, user: currentUser });

    // Listen for new participants
    socket.on('userJoined', (user) => {
      setParticipants(prev => [...prev, user]);
      toast.info(`${user.name} joined the call`);
    });

    // Listen for participant updates
    socket.on('participantUpdated', (updatedParticipant) => {
      setParticipants(prev => 
        prev.map(p => p.id === updatedParticipant.id ? updatedParticipant : p)
      );
    });

    // Listen for participant departures
    socket.on('userLeft', (userId) => {
      setParticipants(prev => {
        const user = prev.find(p => p.id === userId);
        if (user) {
          toast.info(`${user.name} left the call`);
        }
        return prev.filter(p => p.id !== userId);
      });
    });

    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for typing indicators
    socket.on('userTyping', (user) => {
      setParticipants(prev =>
        prev.map(p => p.id === user.id ? { ...p, isTyping: true } : p)
      );
    });

    socket.on('userStoppedTyping', (user) => {
      setParticipants(prev =>
        prev.map(p => p.id === user.id ? { ...p, isTyping: false } : p)
      );
    });

    return () => {
      socket.emit('leaveRoom', { roomId });
      socket.off('userJoined');
      socket.off('participantUpdated');
      socket.off('userLeft');
      socket.off('newMessage');
      socket.off('userTyping');
      socket.off('userStoppedTyping');
    };
  }, [socket, isConnected, roomId, currentUser]);

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => {
        const [hours, minutes, seconds] = prev.split(':').map(Number);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Message handling
  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now().toString(),
      ...message,
      sender: currentUser.name,
      avatar: currentUser.avatar,
      status: 'sent'
    };
    setMessages(prev => [...prev, newMessage]);
    socket?.emit('chatMessage', { roomId, message: newMessage });
  };

  // Participant management
  const handleAddUser = () => {
    // This would typically open a modal or form to add users
    toast.info('Opening add participant dialog...');
  };

  const handleRefreshParticipants = () => {
    socket?.emit('refreshParticipants', { roomId });
    toast.info('Refreshing participants list...');
  };

  const handleSendReminder = () => {
    const absentUsers = participants.filter(p => p.status === 'offline');
    socket?.emit('sendReminder', { roomId, users: absentUsers });
    toast.success(`Sending reminders to ${absentUsers.length} participants`);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        meetingTitle={meetingInfo.title}
        teamName="Design Team"
        onCallCount={participants.filter(p => p.status === 'online').length}
        absentCount={participants.filter(p => p.status === 'offline').length}
        onShowInfo={() => setShowMeetingInfo(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Video Call */}
          <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
            <VideoCall
              roomId={roomId}
              user={currentUser}
              participants={participants}
              callDuration={callDuration}
              onAddUser={handleAddUser}
            />
          </div>

          {/* Right Panel */}
          <div className="w-[320px] flex flex-col bg-white border-l border-gray-200">
            <div className="flex items-center border-b">
              <button
                onClick={() => setSelectedTab('messages')}
                className={cn(
                  "flex-1 px-4 py-3 text-sm font-medium text-center transition-colors",
                  selectedTab === 'messages' 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Messages
              </button>
              <button
                onClick={() => setSelectedTab('participants')}
                className={cn(
                  "flex-1 px-4 py-3 text-sm font-medium text-center transition-colors",
                  selectedTab === 'participants' 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Participants
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {selectedTab === 'participants' ? (
                <ParticipantsList
                  roomId={roomId}
                  participants={participants}
                  currentUser={currentUser}
                  onRefresh={handleRefreshParticipants}
                  onSendReminder={handleSendReminder}
                />
              ) : (
                <ChatPanel
                  roomId={roomId}
                  messages={messages}
                  participants={participants}
                  currentUser={currentUser}
                  onSendMessage={handleSendMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Info Modal */}
      {showMeetingInfo && (
        <MeetingInfo
          roomId={roomId}
          title={meetingInfo.title}
          description={meetingInfo.description}
          scheduledTime={meetingInfo.scheduledTime}
          participantsCount={participants.length + 1}
          hostName={meetingInfo.hostName}
          onClose={() => setShowMeetingInfo(false)}
        />
      )}
    </div>
  );
}

export default Index;
