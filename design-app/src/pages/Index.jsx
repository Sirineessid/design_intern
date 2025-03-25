import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import VideoCall from '@/components/VideoCall';
import ChatPanel from '@/components/ChatPanel';
import ParticipantsList from '@/components/ParticipantsList';
import Avatar from '@/components/Avatar';
import { toast } from 'sonner';

const Index = () => {
  const [activeItem, setActiveItem] = useState('video');
  const [callDuration, setCallDuration] = useState('00:04:32');
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
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
      {/* Left sidebar */}
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      {/* Main content */}
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
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="text-sm text-gray-600 mr-2">
                Publisher
              </div>
              <div className="flex items-center gap-2">
                <Avatar 
                  src="https://randomuser.me/api/portraits/men/44.jpg" 
                  alt="Robert Dwane" 
                  size="sm" 
                  status="online" 
                />
                <span className="text-sm font-medium">Robert Dwane</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main call area */}
        <div className="flex-1 overflow-hidden flex">
          <div className={`flex-1 ${showChat || showParticipants ? 'lg:mr-0' : ''} p-6`}>
            <div className="h-full flex flex-col">
              {/* Video conference UI */}
              <div className="flex-1 rounded-xl overflow-hidden">
                <VideoCall 
                  participants={participants} 
                  mainParticipant={mainParticipant} 
                  callDuration={callDuration}
                />
              </div>
              
              {/* Participant stats */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 p-2 rounded-md bg-white shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span className="text-sm font-medium">On-Call Participants</span>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs">
                      {participants.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 rounded-md bg-white shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="8" y1="3" x2="10" y2="11"/></svg>
                    <span className="text-sm font-medium">Absent Participants</span>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs">
                      {absentParticipants.length}
                    </span>
                  </div>
                </div>
                
                <button 
                  className="p-2 rounded-md bg-brand-blue hover:bg-blue-600 text-white text-sm flex items-center gap-2 transition-colors duration-200"
                  onClick={handleAddUser}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                  Add user to call
                </button>
              </div>
            </div>
          </div>
          
          {/* Right panel with tabs */}
          <div className={`flex ${showChat ? 'w-96' : 'w-0 opacity-0'} transition-all duration-300 overflow-hidden`}>
            <ChatPanel 
              title="Group Chat" 
              messages={messages} 
              onSendMessage={handleSendMessage}
              showParticipants={showParticipants}
              onToggleParticipants={() => setShowParticipants(!showParticipants)}
            />
          </div>
          
          {/* Participants panel */}
          <div className={`flex ${showParticipants ? 'w-80' : 'w-0 opacity-0'} transition-all duration-300 overflow-hidden`}>
            <div className="w-full p-6 bg-white border-l border-gray-200 shadow-lg animate-slide-in-right">
              <ParticipantsList 
                onCall={participants.map(p => ({...p, status: p.status || 'online'}))} 
                absent={absentParticipants} 
                onAddUser={handleAddUser}
                onRefresh={handleRefreshParticipants}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
