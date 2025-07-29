import React from 'react';
import TopBar from '../components/TopBar';
import ActiveNowGrid from '../components/ActiveNowGrid';
import VibeRoomList from '../components/VibeRoomList';

const HomePage = () => {
  const profiles = [
    { id: 1, name: 'Tywin Lannister', info: 'Loves music', img: '/img1.jpg' },
    { id: 2, name: 'Bastard of Winterfell', info: 'Enjoys hiking', img: '/img2.jpg' },
    { id: 3, name: 'Robert Baratheon', info: 'Coffee enthusiast', img: '/img3.jpg' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-pink-100">
      <TopBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <ActiveNowGrid profiles={profiles} />
        <VibeRoomList />
      </main>
    </div>
  );
};

export default HomePage;
