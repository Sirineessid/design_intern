import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  Layout,
  MoreVertical,
  Volume2,
  Maximize2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const CallControls = ({
  onMicToggle,
  onVideoToggle,
  onScreenShareToggle,
  onLayoutChange,
  onEndCall,
  onFullScreen,
  isMuted,
  isVideoOff,
  isScreenSharing,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const buttonStyle =
    'w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 shadow hover:scale-105 bg-gray-800 text-white';

  return (
    <div className="relative flex flex-wrap justify-center items-center gap-3 bg-black/40 p-4 rounded-xl shadow-xl backdrop-blur-sm">
      {showVolumeSlider && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 p-2 rounded-lg bg-white/80 backdrop-blur">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-32 appearance-none bg-gray-300 rounded h-1"
          />
        </div>
      )}

      <Tooltip label="Volume">
        <button onClick={() => setShowVolumeSlider(!showVolumeSlider)} className={buttonStyle}>
          <Volume2 size={20} />
        </button>
      </Tooltip>

      <Tooltip label={isMuted ? 'Unmute' : 'Mute'}>
        <button onClick={onMicToggle} className={buttonStyle}>
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </Tooltip>

      <Tooltip label={isVideoOff ? 'Turn on camera' : 'Turn off camera'}>
        <button onClick={onVideoToggle} className={buttonStyle}>
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>
      </Tooltip>

      <Tooltip label="End Call">
        <button onClick={onEndCall} className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md">
          <PhoneOff size={20} />
        </button>
      </Tooltip>

      <Tooltip label={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}>
        <button onClick={onScreenShareToggle} className={buttonStyle}>
          <ScreenShare size={20} />
        </button>
      </Tooltip>

      <Tooltip label="Change Layout">
        <button onClick={onLayoutChange} className={buttonStyle}>
          <Layout size={20} />
        </button>
      </Tooltip>

      <Tooltip label="Fullscreen">
        <button onClick={onFullScreen} className={buttonStyle}>
          <Maximize2 size={20} />
        </button>
      </Tooltip>

      <Tooltip label="More Options">
        <button className={buttonStyle}>
          <MoreVertical size={20} />
        </button>
      </Tooltip>
    </div>
  );
};

const Tooltip = ({ label, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
      {label}
    </div>
  </div>
);

export default CallControls;
