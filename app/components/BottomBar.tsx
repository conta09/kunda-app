"use client";

import Link from 'next/link';
import {
  HomeIcon,
  HeartIcon,
  MapPinIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  HeartIcon as HeartIconSolid,
  MapPinIcon as MapPinIconSolid
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

const BottomBar = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: currentPath === '/' ? <HomeIconSolid className="h-6 w-6" /> : <HomeIcon className="h-6 w-6" />
    },
    {
      name: 'Likes',
      path: '/likes',
      icon: currentPath === '/likes' ? <HeartIconSolid className="h-6 w-6" /> : <HeartIcon className="h-6 w-6" />
    },
    {
      name: 'Near Me',
      path: '/nearme',
      icon: currentPath === '/nearme' ? <MapPinIconSolid className="h-6 w-6" /> : <MapPinIcon className="h-6 w-6" />
    },
    
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <BellIcon className="h-6 w-6" />
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30" />
      <nav className="bg-black backdrop-blur-lg bg-opacity-90 px-4 py-3 shadow-2xl">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                currentPath === item.path
                  ? 'text-white bg-gray-800 transform -translate-y-1 shadow-lg shadow-gray-900/50'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.name === 'Notifications' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BottomBar;
