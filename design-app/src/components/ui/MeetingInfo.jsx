import React, { useState } from 'react';
import { Copy, Share2, Info, Calendar, Users, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

const MeetingInfo = ({ 
  roomId,
  title,
  description,
  scheduledTime,
  participantsCount,
  hostName,
  onClose
}) => {
  const [showInfo, setShowInfo] = useState(false);
  
  const meetingLink = `${window.location.origin}/room/${roomId}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      toast.success('Meeting link copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy meeting link');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join meeting: ${title}`,
          text: `You're invited to join a meeting: ${title}`,
          url: meetingLink
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          toast.error('Failed to share meeting link');
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Info size={20} className="text-gray-500" />
            <h2 className="text-lg font-semibold">Meeting Info</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Meeting Details */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Meeting Title</h3>
            <p className="mt-1 text-base font-medium">{title}</p>
          </div>

          {description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-sm text-gray-700">{description}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-500">Time</h3>
            <div className="mt-1 flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <p className="text-sm text-gray-700">
                {new Date(scheduledTime).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Host</h3>
            <p className="mt-1 text-sm text-gray-700">{hostName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Participants</h3>
            <div className="mt-1 flex items-center gap-2">
              <Users size={16} className="text-gray-400" />
              <p className="text-sm text-gray-700">{participantsCount} people</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Meeting Link</h3>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={meetingLink}
                readOnly
                className="flex-1 text-sm bg-gray-50 border rounded-lg px-3 py-2"
              />
              <button
                onClick={handleCopyLink}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copy link"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingInfo; 