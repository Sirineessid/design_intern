import React from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './toolip.jsx'; 

const VideoParticipant = ({
  src,
  name = 'Unknown',
  isSpeaking = false,
  isMuted = false,
  isVideoOff = false,
  isScreenSharing = false,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    full: 'w-full h-full',
  };

  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <TooltipProvider>
      <div
        className={cn(
          'relative rounded-xl overflow-hidden transition-all duration-300',
          isSpeaking ? 'ring-2 ring-brand-blue ring-offset-2' : '',
          sizeClasses[size],
          className
        )}
        role="region"
        aria-label={`${name}'s participant box`}
      >
        {isVideoOff ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-white font-medium">{initials}</span>
            </div>
          </div>
        ) : (
          <img
            src={src}
            alt={`${name}'s video`}
            role="img"
            aria-label={`${name}'s video stream`}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <span className="text-white text-xs font-medium truncate">{name}</span>
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  {isMuted ? (
                    <MicOff size={14} className="text-brand-red" />
                  ) : (
                    <Mic size={14} className="text-white" />
                  )}
                </TooltipTrigger>
                <TooltipContent>{isMuted ? 'Muted' : 'Mic On'}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  {isVideoOff ? (
                    <VideoOff size={14} className="text-brand-red" />
                  ) : (
                    <Video size={14} className="text-white" />
                  )}
                </TooltipTrigger>
                <TooltipContent>{isVideoOff ? 'Video Off' : 'Video On'}</TooltipContent>
              </Tooltip>

              {isScreenSharing && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="6"
                        width="12"
                        height="12"
                        rx="2"
                        stroke="#FF3B30"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 17V19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 21H16"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>Screen Sharing</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

VideoParticipant.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  isSpeaking: PropTypes.bool,
  isMuted: PropTypes.bool,
  isVideoOff: PropTypes.bool,
  isScreenSharing: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  className: PropTypes.string,
};

export default VideoParticipant;
