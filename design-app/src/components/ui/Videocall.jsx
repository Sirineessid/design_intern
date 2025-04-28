import React, { useState } from 'react';
import VideoParticipant from './VideoParticipant.jsx';
import CallControls from './CallControls.jsx';
import { cn } from '../../lib/utils';

const VideoCall = ({
  participants = [],
  mainParticipant = {},
  callDuration = '00:00',
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [layout, setLayout] = useState('focus');

  const handleMicToggle = () => setIsMuted(!isMuted);
  const handleVideoToggle = () => setIsVideoOff(!isVideoOff);
  const handleScreenShareToggle = () => setIsScreenSharing(!isScreenSharing);
  const handleLayoutChange = () => setLayout(layout === 'grid' ? 'focus' : 'grid');
  const handleEndCall = () => console.log('End call');
  const handleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  const sortedParticipants = [...participants].sort((a, b) => b.isSpeaking - a.isSpeaking);

  return (
    <div className="relative h-full w-full flex flex-col">

      {/* Top info: meeting info and call timer */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1">
        <div className="text-lg font-semibold">{/* Meeting Title (optional) */}</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <span className="font-medium">On-Call Participants:</span>
            <span className="text-green-600">{participants.length}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <span className="font-medium">Absent Participants:</span>
            <span className="text-red-500">3</span>{/*you can make it dynamically   */}
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            + Add user to call
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900 rounded-xl overflow-hidden animate-fade-in mt-2">
        {/* Vertical Controls */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
          <button onClick={handleMicToggle} className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
            <img src="/icons/mic.svg" alt="Mic" className="h-5 w-5" />
          </button>
          <button onClick={handleVideoToggle} className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
            <img src="/icons/video.svg" alt="Video" className="h-5 w-5" />
          </button>
          <button onClick={handleScreenShareToggle} className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
            <img src="/icons/share.svg" alt="Screen Share" className="h-5 w-5" />
          </button>
          <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
            <img src="/icons/chat.svg" alt="Chat" className="h-5 w-5" />
          </button>
        </div>

        {/* Main Participant Video */}
        <div className="w-full h-full">
          <VideoParticipant 
            src={mainParticipant.avatar}
            name={mainParticipant.name}
            isSpeaking={mainParticipant.isSpeaking}
            isMuted={mainParticipant.isMuted}
            isVideoOff={mainParticipant.isVideoOff}
            isScreenSharing={mainParticipant.isScreenSharing}
            size="full"
            className={cn(
              "transition-all duration-200",
              mainParticipant.isSpeaking && "ring-4 ring-green-400"
            )}
          />
        </div>

        {/* Right side Participants */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-3">
          {sortedParticipants.slice(0, 5).map((participant) => (
            <VideoParticipant
              key={participant.id}
              src={participant.isVideoOff ? '/path/to/avatar-placeholder.png' : participant.avatar}
              name={participant.isVideoOff ? participant.name[0] + participant.name[1] : participant.name}
              isSpeaking={participant.isSpeaking}
              isMuted={participant.isMuted}
              isVideoOff={participant.isVideoOff}
              isScreenSharing={participant.isScreenSharing}
              size="sm"
              className="transition-transform hover:scale-105"
            />
          ))}

          {participants.length > 5 && (
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">
              +{participants.length - 5}
            </div>
          )}
        </div>

        {/* Call Timer */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-xs">
          {callDuration}
        </div>
      </div>

      {/* Bottom Call Controls */}
      <div className="flex justify-center py-4">
        <CallControls
          onMicToggle={handleMicToggle}
          onVideoToggle={handleVideoToggle}
          onScreenShareToggle={handleScreenShareToggle}
          onLayoutChange={handleLayoutChange}
          onEndCall={handleEndCall}
          onFullScreen={handleFullScreen}
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          isScreenSharing={isScreenSharing}
          callDuration={callDuration}
        />
      </div>
    </div>
  );
};

export default VideoCall;
