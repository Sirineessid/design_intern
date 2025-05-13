import React, { useState } from 'react';
import { X, Send, Plus } from 'lucide-react';
import { toast } from 'sonner';

const AddParticipantModal = ({ isOpen, onClose, onAddParticipants, roomId }) => {
  const [emails, setEmails] = useState(['']);
  
  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleRemoveEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty emails and validate format
    const validEmails = emails.filter(email => {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (email && !isValid) {
        toast.error(`Invalid email format: ${email}`);
      }
      return email && isValid;
    });

    if (validEmails.length === 0) {
      toast.error('Please enter at least one valid email');
      return;
    }

    try {
      await onAddParticipants(validEmails);
      toast.success('Participants added successfully');
      setEmails(['']);
      onClose();
    } catch (error) {
      toast.error('Failed to add participants');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add Participants</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-3">
            {emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddEmail}
            className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} />
            Add another email
          </button>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center gap-2"
            >
              <Send size={16} />
              Send Invites
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParticipantModal; 