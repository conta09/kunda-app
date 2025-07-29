import React from 'react';

const rooms = [
  { id: 1, name: 'Night Owls 🌙', description: 'Chat with late-night people' },
  { id: 2, name: 'Movie Talk 🎬', description: 'Discuss trending movies' },
  { id: 3, name: 'Vibe & Chill 🎶', description: 'Hangout and share music' },
];

const VibeRoomList: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Join a Vibe Room 🪩</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{room.name}</h3>
              <p className="text-sm text-gray-600">{room.description}</p>
            </div>
            <button className="bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700">
              Join 🚪
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VibeRoomList;
