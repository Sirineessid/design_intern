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

  const buttonBaseStyle =
    'w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 shadow-md hover:scale-105';

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
            className="w-32 appearance-none bg-gray-300 rounded h-1 slider-thumb"
          />
        </div>
      )}

      {/* Call duration */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full glass-dark text-white text-xs font-medium flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
        {callDuration}
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center space-x-3 p-4 rounded-full glass-dark shadow-xl transition-all duration-300 animate-fade-in">
        <Tooltip label="Adjust Volume">
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className={cn(buttonBaseStyle, 'bg-gray-600 text-white')}
          >
            <Volume2 size={20} />
          </button>
        </Tooltip>

        <Tooltip label={isMuted ? "Unmute Mic" : "Mute Mic"}>
          <button
            onClick={onMicToggle}
            className={cn(
              buttonBaseStyle,
              isMuted ? "bg-gray-600 text-white" : "bg-gray-800 text-white"
            )}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </Tooltip>

        <Tooltip label={isVideoOff ? "Turn Video On" : "Turn Video Off"}>
          <button
            onClick={onVideoToggle}
            className={cn(
              buttonBaseStyle,
              isVideoOff ? "bg-gray-600 text-white" : "bg-gray-800 text-white"
            )}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>
        </Tooltip>

        <Tooltip label="End Call">
          <button
            onClick={onEndCall}
            className={cn(buttonBaseStyle, 'bg-brand-red text-white hover:bg-red-600')}
          >
            <PhoneOff size={20} />
          </button>
        </Tooltip>

        <Tooltip label={isScreenSharing ? "Stop Screen Share" : "Share Screen"}>
          <button
            onClick={onScreenShareToggle}
            className={cn(
              buttonBaseStyle,
              isScreenSharing ? "bg-brand-blue text-white" : "bg-gray-600 text-white"
            )}
          >
            <ScreenShare size={20} />
          </button>
        </Tooltip>

        <Tooltip label="Change Layout">
          <button
            onClick={onLayoutChange}
            className={cn(buttonBaseStyle, 'bg-gray-600 text-white')}
          >
            <Layout size={20} />
          </button>
        </Tooltip>

        <Tooltip label="More Options">
          <button
            className={cn(buttonBaseStyle, 'bg-gray-600 text-white')}
          >
            <MoreVertical size={20} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

// Tooltip Component
const Tooltip = ({ label, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
      {label}
    </div>
  </div>
);

export default CallControls;
