import React from 'react';

interface Profile {
  id: number;
  name: string;
  img: string;
  info: string;
}

interface Props {
  profiles: Profile[];
}

const ActiveNowGrid: React.FC<Props> = ({ profiles }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Active Now 🔥</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center">
            <div className="relative">
              <img src={profile.img} alt={profile.name} className="w-20 h-20 rounded-full object-cover" />
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <h3 className="mt-2 font-medium">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.info}</p>
            <button className="mt-2 bg-pink-500 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-600">
              Say Hi 👋
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveNowGrid;
