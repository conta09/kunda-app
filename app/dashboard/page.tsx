'use client';
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import TabsBar from '../components/TabsBar';
import ProfileGrid from '../components/ProfileGrid';
import VibeRoomList from '../components/VibeRoomList';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('discover');

  const profiles = [
    { id: 1, name: 'Lolaa, 23', info: 'Mitseró', img: '/img1.jpg', isNew: true },
    { id: 2, name: 'duygu, 24', info: '', img: '/img2.jpg' },
    { id: 3, name: 'selflove ❤️, 32', info: 'Karaoğlanoğlu', img: '/img3.jpg' },
    { id: 4, name: 'kübra, 25', info: 'Girne', img: '/img2.jpg' },
    { id: 5, name: 'Nadia, 21', info: 'Kigali', img: '/img1.jpg', isNew: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopBar />

      <div className="sticky top-0 bg-white z-10 px-4 py-2 shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Discover</h2>
        <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === 'discover' && <ProfileGrid profiles={profiles} />}
        {activeTab === 'likes' && <VibeRoomList />}
        {activeTab === 'views' && (
          <div className="text-center text-gray-500">No views yet. Try being more active 😉</div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
