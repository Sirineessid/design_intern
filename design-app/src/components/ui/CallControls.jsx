import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ScreenShare, Layout, MoreVertical, Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const CallControls = ({
  onMicToggle,
  onVideoToggle,
  onScreenShareToggle,
  onLayoutChange,
  onEndCall,
  isMuted,
  isVideoOff,
  isScreenSharing,
  callDuration
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {/* Volume slider */}
      {showVolumeSlider && (
        <div className="absolute bottom-full mb-2 p-2 rounded-lg glass-dark animate-fade-in">
          <input 
            type="range" 
            min="0" 
            max="100" 
            defaultValue="50"
            className="volume-slider"
            // Removed the invalid 'orientation' attribute
          />
        </div>
      )}
    
      {/* Call duration */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full glass-dark text-white text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
          {callDuration}
        </div>
      </div>
      
      {/* Main controls */}
      <div className="flex items-center justify-center space-x-2 p-3 rounded-full glass-dark shadow-lg transition-all duration-300 animate-fade-in">
        <button 
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className="call-control-button bg-gray-600 text-white hover:bg-gray-700"
        >
          <Volume2 size={20} />
        </button>
        
        <button 
          onClick={onMicToggle}
          className={cn(
            "call-control-button",
            isMuted ? "bg-gray-600 text-white" : "bg-gray-800 text-white"
          )}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        
        <button 
          onClick={onVideoToggle}
          className={cn(
            "call-control-button",
            isVideoOff ? "bg-gray-600 text-white" : "bg-gray-800 text-white"
          )}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>
        
        <button 
          onClick={onEndCall}
          className="call-control-button bg-brand-red text-white hover:bg-red-600"
        >
          <PhoneOff size={20} />
        </button>
        
        <button 
          onClick={onScreenShareToggle}
          className={cn(
            "call-control-button",
            isScreenSharing ? "bg-brand-blue text-white" : "bg-gray-600 text-white"
          )}
        >
          <ScreenShare size={20} />
        </button>
        
        <button 
          onClick={onLayoutChange}
          className="call-control-button bg-gray-600 text-white hover:bg-gray-700"
        >
          <Layout size={20} />
        </button>
        {/* This button changes the layout when clicked */}
        <button 
          className="call-control-button bg-gray-600 text-white hover:bg-gray-700"
        >
          {/*vertical three-dot menu*/}
          {/* This button represents additional options but has no onClick event */}
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default CallControls;
