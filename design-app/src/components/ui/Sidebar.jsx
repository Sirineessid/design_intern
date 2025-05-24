
import React, { useState } from 'react';
import { ChevronLeft, Signal, MessageSquare, Video, Monitor, Settings, Mic, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ 
  meetingTitle, 
  teamName, 
  onCallCount, 
  absentCount, 
  onShowInfo,
  currentSpeakerTranscription // new prop
}) => {
  const [micVolume, setMicVolume] = useState(50);

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
      <div className="p-4 border-b">
        {/* Back button & logo */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
            {/* logo SVG */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              {/* ... */}
            </svg>
          </div>
        </div>

        {/* Meeting title & team */}
        <div className="mt-4">
          <h1 className="text-lg font-medium text-gray-900">{meetingTitle}</h1>
          <div className="mt-1 flex items-center justify-between">
            <div className="text-xs font-medium text-purple-800 bg-purple-100 px-2 py-1 rounded-full">
              {teamName}
            </div>
            <button
              onClick={onShowInfo}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              title="Meeting Info"
            >
              <Info size={18} />
            </button>
          </div>
        </div>

        {/* Current speaker transcription */}
        {currentSpeakerTranscription && (
          <div className="mt-3 p-2 bg-gray-50 rounded border border-gray-200 text-sm italic text-gray-700">
            <strong>Speaking:</strong> "{currentSpeakerTranscription}"
          </div>
        )}
      </div>

      {/* Sidebar controls */}
      <div className="flex-1 p-4 space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.active || false;
          return (
            <div key={item.id} className="flex items-center space-x-2">
              <button
                className={cn(
                  "relative group p-2 rounded-full transition-colors",
                  isActive 
                    ? "bg-green-100 text-green-600" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
                aria-label={item.label}
              >
                <Icon size={20} />
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 bg-opacity-90 shadow-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </span>
              </button>
              {item.id === 'microphone' && (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={micVolume}
                  onChange={(e) => setMicVolume(parseInt(e.target.value, 10))}
                  className="w-24 transform -rotate-90"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
