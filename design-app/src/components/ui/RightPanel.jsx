import React, { useState } from 'react';
import ChatPanel from './ChatPanel.jsx';
import ParticipantsList from './ParticipantsList.jsx';

const RightPanel = ({ messages, onSendMessage, participants, absentParticipants, onRefreshParticipants, onAddUser }) => {
  const [selectedTab, setSelectedTab] = useState('groupChat');
  
  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setSelectedTab('groupChat')} className={selectedTab === 'groupChat' ? 'text-green-500 border-b-2 border-green-500' : ''}>Group Chat</button>
        <button onClick={() => setSelectedTab('messages')} className={selectedTab === 'messages' ? 'text-green-500 border-b-2 border-green-500' : ''}>Messages</button>
        <button onClick={() => setSelectedTab('participants')} className={selectedTab === 'participants' ? 'text-green-500 border-b-2 border-green-500' : ''}>Participants</button>
      </div>
      {selectedTab === 'groupChat' && (
        <ChatPanel messages={messages} onSendMessage={onSendMessage} />
      )}
      {selectedTab === 'messages' && (
        <div>Messages Panel (Placeholder)</div>
      )}
      {selectedTab === 'participants' && (
        <ParticipantsList 
          participants={participants} 
          absentParticipants={absentParticipants} 
          onRefreshParticipants={onRefreshParticipants} 
          onAddUser={onAddUser} 
        />
      )}
    </div>
  );
};

export default RightPanel;