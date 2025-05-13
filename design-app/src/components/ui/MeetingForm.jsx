
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Link as LinkIcon } from 'lucide-react';

function MeetingForm() {
  const [formData, setFormData] = useState({
    roomId: '',
    title: '',
    description: '',
    date: '',
    time: '',
    email: '',
    name: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/meeting/${formData.roomId}?email=${formData.email}&name=${formData.name}`);
  };

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 10);
    setFormData(prev => ({ ...prev, roomId: id }));
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Meeting</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Meeting Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Weekly Team Sync"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Meeting agenda and notes..."
            rows="3"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline-block w-4 h-4 mr-1" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="inline-block w-4 h-4 mr-1" />
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Room ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <LinkIcon className="inline-block w-4 h-4 mr-1" />
            Room ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room ID or generate one"
              required
            />
            <button
              type="button"
              onClick={generateRoomId}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Your Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            <Users className="inline-block w-4 h-4 mr-1" />
            Your Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Create Meeting
        </button>
      </form>
    </div>
  );
}

export default MeetingForm;
