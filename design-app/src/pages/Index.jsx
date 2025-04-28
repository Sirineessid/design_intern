import React, { useState, useEffect } from 'react';
import Sidebar from '../components/ui/Sidebar.jsx';
import VideoCall from '../components/ui/Videocall.jsx';
import ChatPanel from '../components/ui/ChatPanel.jsx';
import { toast } from 'sonner';

const Index = () => {
  const [selectedTab, setSelectedTab] = useState('messages');
  const [callDuration, setCallDuration] = useState('00:04:32');

  const mainParticipant = {
    id: '1',
    name: 'Sophia Chen',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    isSpeaking: true,
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
  };

  const [participants, setParticipants] = useState([
    { id: '2', name: 'Sarah Wilson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', isSpeaking: false, isMuted: false, isVideoOff: false, status: 'online' },
    { id: '3', name: 'Michael Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', isSpeaking: false, isMuted: true, isVideoOff: false, status: 'online' },
    { id: '4', name: 'James Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', isSpeaking: false, isMuted: false, isVideoOff: true, status: 'online' },
    { id: '5', name: 'Emily Brown', avatar: 'https://randomuser.me/api/portraits/women/67.jpg', isSpeaking: false, isMuted: true, isVideoOff: false, status: 'online' },
    { id: '6', name: 'David Miller', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', isSpeaking: false, isMuted: false, isVideoOff: false, status: 'online' },
    { id: '7', name: 'Chris Evans', avatar: 'https://randomuser.me/api/portraits/men/77.jpg', isSpeaking: false, isMuted: false, isVideoOff: false, status: 'online' }, // extra for +1 more
  ]);

  const [messages, setMessages] = useState([
    { id: '1', sender: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', message: 'Hi everyone, lets start the call soon', time: '10:00 am, Alex', isCurrentUser: false },
    { id: '2', sender: 'Robert Dwane', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', message: "Hey, we're waiting 😊", time: '10:04 am, Robert', isCurrentUser: false },
    { id: '3', sender: 'You', message: 'Hello all!', time: '10:05 am', isCurrentUser: true, status: 'read' },
    { id: '4', sender: 'Williams', avatar: 'https://randomuser.me/api/portraits/men/68.jpg', message: 'Are we waiting for absent teammates? Shall we start?', time: '10:10 am, Williams', isCurrentUser: false },
    { id: '5', sender: 'You', message: 'I think we can start a bit later :)', time: '10:11 am', isCurrentUser: true, status: 'read' },
    { id: '6', sender: 'Merin', avatar: 'https://randomuser.me/api/portraits/women/64.jpg', message: "I'm typing...", time: '', isCurrentUser: false }, // for typing indicator
  ]);

  const handleSendMessage = (message) => {
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: 'You',
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      status: 'read',
    };
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const [minutes, seconds] = callDuration.split(':').map(Number);
      const totalSeconds = minutes * 60 + seconds + 1;
      const newMinutes = Math.floor(totalSeconds / 60);
      const newSeconds = totalSeconds % 60;
      setCallDuration(
        `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [callDuration]);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar meetingTitle="Weekly Update" teamName="Design Team" onCallCount={participants.length} absentCount={3} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Video Call area */}
          <div className="flex-1 flex flex-col p-2 bg-white border-r border-gray-200">
            <VideoCall mainParticipant={mainParticipant} participants={participants} callDuration={callDuration} />
          </div>

          {/* Chat/Participants Panel */}
          <div className="w-[400px] flex flex-col bg-white">
            <ChatPanel
              title="Group Chat"
              messages={messages}
              onSendMessage={handleSendMessage}
              participants={participants}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
