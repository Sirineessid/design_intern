import React, { useState } from 'react';
import VideoParticipant from './VideoParticipant.jsx';
import CallControls from './CallControls.jsx';
import { cn } from './lib/utils';

const VideoCall = ({
  participants,
  mainParticipant,
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

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Video layout container */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900 rounded-xl overflow-hidden animate-fade-in">
        {layout === 'focus' ? (
          <>
            {/* Main large video */}
            <div className="w-full h-full">
              <VideoParticipant 
                src={mainParticipant.avatar} 
                name={mainParticipant.name}
                isSpeaking={mainParticipant.isSpeaking}
                isMuted={mainParticipant.isMuted}
                isVideoOff={mainParticipant.isVideoOff}
                isScreenSharing={mainParticipant.isScreenSharing}
                size="full"
              />
            </div>
            
            {/* Participants strip at the right side */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2">
              {participants.slice(0, 5).map(participant => (
                <VideoParticipant 
                  key={participant.id}
                  src={participant.avatar} 
                  name={participant.name}
                  isSpeaking={participant.isSpeaking}
                  isMuted={participant.isMuted}
                  isVideoOff={participant.isVideoOff}
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
            {[mainParticipant, ...participants].map(participant => (
              <VideoParticipant 
                key={participant.id}
                src={participant.avatar} 
                name={participant.name}
                isSpeaking={participant.isSpeaking}
                isMuted={participant.isMuted}
                isVideoOff={participant.isVideoOff}
                size="full"
                className="transition-transform hover:scale-[1.02]"
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Call controls at the bottom */}
      <div className="flex justify-center py-4">
        <CallControls 
          onMicToggle={handleMicToggle}
          onVideoToggle={handleVideoToggle}
          onScreenShareToggle={handleScreenShareToggle}
          onLayoutChange={handleLayoutChange}
          onEndCall={handleEndCall}
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
