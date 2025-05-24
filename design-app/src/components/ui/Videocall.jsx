import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Share2, Settings, Users, Volume2, UserPlus } from 'lucide-react';
import VideoParticipant from './VideoParticipant';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { uploadToIpfs as storeRecording } from '../../ipfs/ipfs.uploader';
import { grantAccess } from '../../blockchain/contractApi';

const VideoCall = ({
  roomId,
  title = "UI/UX Design weekly update",
  teamName = "Design Team",
  user,
  participants,
  callDuration,
  onAddUser
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const videoRef = useRef(null);
  const screenStreamRef = useRef(null);
  const audioStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const { socket } = useSocket();

  // Handle camera access
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        audioStreamRef.current = stream;
        startRecording(stream);
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error('Could not access camera or microphone');
      }
    };
    
    if (!isVideoOff) {
      startVideo();
    }
  }, [isVideoOff]);
    const startRecording = (stream) => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0 && socket) {
        socket.emit('audio-chunk', { roomId, chunk: event.data });
      }
    });

    mediaRecorder.start(1000); // Send audio chunks every second
  };
 useEffect(() => {
    if (socket) {
      socket.on('transcription', ({ text }) => {
        setTranscription((prev) => prev + ' ' + text);
      });
    }

    return () => {
      if (socket) {
        socket.off('transcription');
      }
    };
  }, [socket]);

  // Handle screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        screenStreamRef.current = screenStream;
        if (videoRef.current) {
          videoRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);
        socket?.emit('screenShare', { roomId, isSharing: true });
      } else {
        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (!isVideoOff) {
          const camStream = await navigator.mediaDevices.getUserMedia({ 
            video: true,
            audio: true 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = camStream;
          }
        }
        setIsScreenSharing(false);
        socket?.emit('screenShare', { roomId, isSharing: false });
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
      toast.error('Could not share screen');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    socket?.emit('toggleAudio', { roomId, isMuted: !isMuted });
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    socket?.emit('toggleVideo', { roomId, isVideoOff: !isVideoOff });
  };

  const handleVolumeChange = (e) => {
    setVolume(parseInt(e.target.value));
  };

  async function onCallEnd(){
    // Implement call ending logic
    toast.info('Ending call...');
    socket?.emit('leaveRoom', { roomId });
    //generate blob
     const blob = new Blob(recordedChunks, { type: 'video/webm' });
     //store encrypt to ipfs 
     const cid = await storeRecording(blob, encryptionKey);
     //grant blockchain access 
     await grantAccess(cid, participants);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
        <div>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
          <p className="text-sm text-gray-400">{teamName}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400 recording-dot">
            {callDuration}
          </div>
        </div>
      </div>

      {/* Participants Stats & Add User */}
      <div className="px-6 py-3 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-300">On Call</span>
              <span className="px-2 py-0.5 text-xs font-medium text-green-400 bg-green-400/20 rounded-full">
                {participants.filter(p => p.status === 'online').length + 1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-300">Absent</span>
              <span className="px-2 py-0.5 text-xs font-medium text-red-400 bg-red-400/20 rounded-full">
                {participants.filter(p => p.status === 'offline').length}
              </span>
            </div>
          </div>
          
          <button 
            onClick={onAddUser}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-400 bg-blue-400/20 rounded-full hover:bg-blue-400/30 transition-colors"
          >
            <UserPlus size={16} />
            Add user to call
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
          {/* Main user video */}
          <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden bg-gray-800">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isMuted}
              className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
            />
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-2xl text-white">{user.name[0]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Participant videos */}
          {participants.map((participant) => (
            <VideoParticipant
              key={participant.id}
              src={participant.avatar}
              name={participant.name}
              isMuted={participant.isMuted}
              isVideoOff={participant.isVideoOff}
              isScreenSharing={participant.isScreenSharing}
              isSpeaking={participant.isSpeaking}
            />
          ))}
        </div>
      </div>

      {/* Call Controls */}
      <div className="px-6 py-4 bg-gray-800">
        <div className="flex items-center justify-center gap-4">
          {/* Mic Control */}
          <button
            onClick={toggleMute}
            className={`call-control-button ${isMuted ? 'bg-red-500' : 'bg-gray-600'}`}
          >
            {isMuted ? <MicOff className="text-white" /> : <Mic className="text-white" />}
          </button>

          {/* Video Control */}
          <button
            onClick={toggleVideo}
            className={`call-control-button ${isVideoOff ? 'bg-red-500' : 'bg-gray-600'}`}
          >
            {isVideoOff ? <VideoOff className="text-white" /> : <Video className="text-white" />}
          </button>

          {/* Screen Share */}
          <button
            onClick={toggleScreenShare}
            className={`call-control-button ${isScreenSharing ? 'bg-blue-500' : 'bg-gray-600'}`}
          >
            <Share2 className="text-white" />
          </button>

          {/* Volume Control */}
          <div className="relative">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="call-control-button bg-gray-600"
            >
              <Volume2 className="text-white" />
            </button>
            {showVolumeSlider && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="call-control-button bg-gray-600">
            <Settings className="text-white" />
          </button>

          {/* End Call */}
          <button
            onClick={onCallEnd}
            className="call-control-button bg-red-500"
          >
            <PhoneOff className="text-white" />
          </button>
        </div>
      </div>
     <div className="flex-1 flex flex-col bg-gray-900">
      {/* Existing UI components */}
      {/* Display Transcription */}
      <div className="px-6 py-2 bg-gray-800 text-white">
        <h2 className="text-sm font-semibold">Live Transcription:</h2>
        <p className="text-sm">{transcription}</p>
      </div>
      {/* Existing UI components */}
    </div>
  </div>
);
}
export default VideoCall;
