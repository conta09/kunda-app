import React from 'react';

interface Profile {
  id: number;
  name: string;
  info: string;
  img: string;
  isNew?: boolean;
}

interface Props {
  profiles: Profile[];
}

const ProfileGrid: React.FC<Props> = ({ profiles }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {profiles.map((p) => (
        <div key={p.id} className="relative bg-white rounded-2xl overflow-hidden shadow-md">
          {p.isNew && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full z-10">
              New
            </div>
          )}
          <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
          <div className="p-2">
            <h3 className="font-semibold text-sm">{p.name}</h3>
            <p className="text-xs text-gray-500">{p.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileGrid;
