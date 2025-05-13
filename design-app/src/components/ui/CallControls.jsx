import React from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  Maximize2,
  MoreHorizontal
} from 'lucide-react';

const CallControls = ({
  onMicToggle,
  onVideoToggle,
  onScreenShareToggle,
  onEndCall,
  isMuted,
  isVideoOff,
  isScreenSharing,
}) => {
  const buttonClass = "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white";
  const endCallClass = "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 bg-red-500 hover:bg-red-600 text-white";

  return (
    <div className="flex items-center gap-3">
      {/* Mic toggle */}
      <button
        onClick={onMicToggle}
        className={buttonClass}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      {/* Video toggle */}
      <button
        onClick={onVideoToggle}
        className={buttonClass}
        title={isVideoOff ? "Start Video" : "Stop Video"}
      >
        {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
      </button>

      {/* End call */}
      <button
        onClick={onEndCall}
        className={endCallClass}
        title="End Call"
      >
        <PhoneOff size={20} />
      </button>

      {/* Screen share */}
      <button
        onClick={onScreenShareToggle}
        className={buttonClass}
        title={isScreenSharing ? "Stop Sharing" : "Share Screen"}
      >
        <ScreenShare size={20} />
      </button>

      {/* Fullscreen */}
      <button
        onClick={() => document.documentElement.requestFullscreen()}
        className={buttonClass}
        title="Enter Fullscreen"
      >
        <Maximize2 size={20} />
      </button>

      {/* More options */}
      <button
        className={buttonClass}
        title="More Options"
      >
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
};

export default CallControls;
