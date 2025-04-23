import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Sidebar from '../components/ui/Sidebar.jsx';
import VideoCall from '../components/ui/Videocall.jsx';
import ChatPanel from '../components/ui/ChatPanel.jsx';
import ParticipantsList from '../components/ui/ParticipantsList.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import { toast } from 'sonner';

const Index = () => {
  const [selectedTab, setSelectedTab] = useState('groupChat');
  const [callDuration, setCallDuration] = useState('00:04:32');
  const [meetingTitle, setMeetingTitle] = useState('UI/UX Design weekly update');

  // Mock data for participants
  const mainParticipant = {
    id: '1',
    name: 'Sophia Chen',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    isSpeaking: true,
    isMuted: false,
    isVideoOff: false
  };

  const [participants, setParticipants] = useState([
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isSpeaking: false,
      isMuted: false,
      isVideoOff: false,
      status: 'online'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      isSpeaking: false,
      isMuted: true,
      isVideoOff: false,
      status: 'online'
    },
    {
      id: '4',
      name: 'James Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      isSpeaking: false,
      isMuted: false,
      isVideoOff: true,
      status: 'online'
    },
    {
      id: '5',
      name: 'Emily Brown',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      isSpeaking: false,
      isMuted: true,
      isVideoOff: false,
      status: 'online'
    },
    {
      id: '6',
      name: 'David Miller',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      isSpeaking: false,
      isMuted: false,
      isVideoOff: false,
      status: 'online'
    }
  ]);

  const [absentParticipants, setAbsentParticipants] = useState([
    {
      id: '7',
      name: 'Jennifer Davis',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      status: 'offline'
    },
    {
      id: '8',
      name: 'Thomas Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      status: 'offline'
    },
    {
      id: '9',
      name: 'Lisa Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
      status: 'offline'
    }
  ]);

  // Mock data for messages
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      message: 'Hi everyone, lets start the call soon',
      time: '10:00 am, Alex',
      isCurrentUser: false
    },
    {
      id: '2',
      sender: 'Robert Dwane',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      message: "Hey, we're waiting 😊",
      time: '10:04 am, Robert',
      isCurrentUser: false
    },
    {
      id: '3',
      sender: 'You',
      message: 'Hello all!',
      time: '10:05 am',
      isCurrentUser: true,
      status: 'read'
    },
    {
      id: '4',
      sender: 'Williams',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      message: 'Are waiting for absent teammates? Shall we start?',
      time: '10:10 am, Williams',
      isCurrentUser: false
    },
    {
      id: '5',
      sender: 'You',
      message: 'I think we can start this call little bit late :)',
      time: '10:11 am',
      isCurrentUser: true,
      status: 'read'
    },
    {
      id: '6',
      sender: 'Williams',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      message: "Hey, I'm waiting. Lol 😁",
      time: '10:20 am, Williams',
      isCurrentUser: false
    },
    {
      id: '7',
      sender: 'Jeffin',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      message: "We can start @ 10:30 👍",
      time: '10:25 am, Jeffin',
      isCurrentUser: false
    },
    {
      id: '8',
      sender: 'Jeffin',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      message: "Started the Call",
      time: '10:30 am, Jeffin',
      isCurrentUser: false
    }
  ]);

  const handleSendMessage = (message) => {
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: 'You',
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      status: 'read'
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate receiving a response after a short delay
    if (messages.length % 3 === 0) {
      setTimeout(() => {
        const responseMessage = {
          id: (messages.length + 2).toString(),
          sender: 'Williams',
          avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
          message: "Thanks for letting us know!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Williams',
          isCurrentUser: false
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 3000);
    }
  };

  const handleAddUser = () => {
    toast("Invitation sent to new participant", {
      description: "They will receive an email to join the call",
      duration: 3000,
    });
  };

  const handleRefreshParticipants = () => {
    toast("Refreshing participants list...", {
      duration: 2000,
    });
    // Simulate refresh with a small delay
    setTimeout(() => {
      toast("Participants list updated", {
        duration: 2000,
      });
    }, 1500);
  };

  // Timer for call duration
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
      {/* Left Sidebar */}
      <Sidebar
        callDuration={callDuration}
        onCallCount={participants.length}
        absentCount={absentParticipants.length}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center">
              <h1 className="text-lg font-medium">{meetingTitle}</h1>
              <div className="ml-3 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                Design Team
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="text-sm text-gray-600 mr-2">Publisher</div>
              <div className="flex items-center gap-2">
                <Avatar
                  src="https://randomuser.me/api/portraits/men/44.jpg"
                  alt="Robert Dwane"
                  size="sm"
                  status="online"
                />
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex space-x-4 ml-4">
              <button
                onClick={() => setSelectedTab('groupChat')}
                className={selectedTab === 'groupChat' ? 'text-green-500 border-b-2 border-green-500' : ''}
              >
                Group Chat
              </button>
              <button
                onClick={() => setSelectedTab('messages')}
                className={selectedTab === 'messages' ? 'text-green-500 border-b-2 border-green-500' : ''}
              >
                Messages
              </button>
              <button
                onClick={() => setSelectedTab('participants')}
                className={selectedTab === 'participants' ? 'text-green-500 border-b-2 border-green-500' : ''}
              >
                Participants
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Video Call */}
          <div className="flex-1 p-3 bg-white border-r border-gray-200">
            <VideoCall mainParticipant={mainParticipant} participants={participants} />
          </div>

          {/* Right Panel */}
          <div className="w-[400px] bg-white p-4 border-l border-gray-200">
            {selectedTab === 'groupChat' && (
              <div className="flex h-full">
                <div className="flex-1 overflow-y-auto">
                  <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
                </div>
                <div className="w-64 ml-4 overflow-y-auto">
                  <ParticipantsList
                    participants={participants}
                    absentParticipants={absentParticipants}
                    onRefreshParticipants={handleRefreshParticipants}
                    onAddUser={handleAddUser}
                  />
                </div>
              </div>
            )}
            {selectedTab === 'messages' && (
              <div className="h-full flex items-center justify-center">Messages tab content</div>
            )}
            {selectedTab === 'participants' && (
              <div className="h-full">
                <ParticipantsList
                  participants={participants}
                  absentParticipants={absentParticipants}
                  onRefreshParticipants={handleRefreshParticipants}
                  onAddUser={handleAddUser}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;