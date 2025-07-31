import React from 'react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">📍 Lefka</button>
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('likes')}
          className={`px-4 py-1 rounded-full text-sm ${
            activeTab === 'likes' ? 'bg-gray-800 text-white' : 'bg-gray-200'
          }`}
        >
          🤍 Likes
        </button>
        <button
          onClick={() => setActiveTab('views')}
          className={`px-4 py-1 rounded-full text-sm ${
            activeTab === 'views' ? 'bg-gray-800 text-white' : 'bg-gray-200'
          }`}
        >
          👁 Views
        </button>
      </div>
      <button className="text-gray-600 text-lg">⚙️</button>
    </div>
  );
};

export default TabsBar;
