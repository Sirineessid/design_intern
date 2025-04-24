import React, { useState } from 'react';
import VideoParticipant from './VideoParticipant.jsx';
import CallControls from './CallControls.jsx';
import { cn } from '../../lib/utils';

const VideoCall = ({
  participants = [],
  mainParticipant = {},
  callDuration
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [layout, setLayout] = useState('focus');

  const handleMicToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoToggle = () => {
    setIsVideoOff(!isVideoOff);
  };

  const handleScreenShareToggle = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const handleLayoutChange = () => {
    setLayout(layout === 'grid' ? 'focus' : 'grid');
  };

  const handleEndCall = () => {
    console.log('End call');
  };

  const handleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  const sortedParticipants = [...participants].sort((a, b) => b.isSpeaking - a.isSpeaking);

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="flex-1 relative flex items-center justify-center bg-gray-900 rounded-xl overflow-hidden animate-fade-in">
        {layout === 'focus' ? (
          <>
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
                  mainParticipant.isSpeaking && "ring-2 ring-green-400"
                )}
              />
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2">
              {sortedParticipants.slice(0, 5).map(participant => (
                <VideoParticipant 
                  key={participant.id}
                  src={participant.isVideoOff ? '/path/to/avatar-placeholder.png' : participant.avatar} 
                  name={participant.isVideoOff ? `${participant.name[0]}${participant.name[1]}` : participant.name}
                  isSpeaking={participant.isSpeaking}
                  isMuted={participant.isMuted}
                  isVideoOff={participant.isVideoOff}
                  isScreenSharing={participant.isScreenSharing}
                  size="md"
                  className="transition-transform hover:scale-105"
                />
              ))}
              {participants.length > 5 && (
                <div className="w-24 h-24 rounded-xl bg-gray-800 flex items-center justify-center text-white text-sm font-medium">
                  +{participants.length - 5} More
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-4 p-4 w-full h-full">
            {[mainParticipant, ...sortedParticipants].map(participant => (
              <VideoParticipant 
                key={participant.id}
                src={participant.isVideoOff ? '/path/to/avatar-placeholder.png' : participant.avatar} 
                name={participant.isVideoOff ? `${participant.name[0]}${participant.name[1]}` : participant.name}
                isSpeaking={participant.isSpeaking}
                isMuted={participant.isMuted}
                isVideoOff={participant.isVideoOff}
                isScreenSharing={participant.isScreenSharing}
                size="full"
                className="transition-transform hover:scale-[1.02]"
              />
            ))}
          </div>
        )}
      </div>
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
