import React, { useState } from 'react';
import ChatPanel from './ChatPanel.jsx';
import ParticipantsList from './ParticipantsList.jsx';

const RightPanel = ({
  messages,
  onSendMessage,
  participants,
  absentParticipants,
  onRefreshParticipants,
  onAddUser
}) => {
  const [selectedTab, setSelectedTab] = useState('groupChat');

  const tabs = [
    { id: 'groupChat', label: 'Group Chat' },
    { id: 'messages', label: 'Messages' },
    { id: 'participants', label: 'Participants' },
  ];

  return (
    <div className="w-full md:w-[350px] h-full bg-white p-4 rounded-lg shadow-lg flex flex-col">
      <div className="flex border-b mb-4 space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex-1 py-2 text-sm font-semibold focus:outline-none ${
              selectedTab === tab.id
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-green-500'
            }`}
            role="tab"
            aria-selected={selectedTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedTab === 'groupChat' && (
          <ChatPanel messages={messages} onSendMessage={onSendMessage} />
        )}
        {selectedTab === 'messages' && (
          <div className="text-center text-gray-400 pt-4">
            Messages Panel (Coming soon!)
          </div>
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
    </div>
  );
};

export default RightPanel;
