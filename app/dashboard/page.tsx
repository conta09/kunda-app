// app/page.tsx
import React from 'react';
import TopBar from '../components/TopBar';
import SwipeCarousel from '../components/SwipeCards';
const HomePage = () => {
  // Assuming your images are in the public folder
  const profiles = [
    { id: 1, name: 'Tywin lannister', info: 'Loves music', img: '/img1.jpg' },
  { id: 2, name: 'Basterd of winterfell', info: 'Enjoys hiking', img: '/img2.jpg' },
  { id: 3, name: 'robert baratheon', info: 'Coffee enthusiast', img: '/img3.jpg' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Discover Profiles</h1>
        <SwipeCarousel profiles={profiles} />
      </main>
      
    </div>
  );
};

export default HomePage;