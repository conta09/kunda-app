// components/SidebarNavigation.tsx
'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaUser, FaHeart, FaComments, FaPlay, FaMapMarkerAlt, FaBolt } from 'react-icons/fa';
import { useDashboard } from '../context/DashboardContext';

const navItems = [
  { name: 'Discover', icon: <FaMapMarkerAlt />, path: '/discover' },
  { name: 'Match', icon: <FaHeart />, path: '/match' },
  { name: 'Chats', icon: <FaComments />, path: '/chats' },
  { name: 'Live', icon: <FaPlay />, path: '/live' },
  { name: 'Credits', icon: <FaBolt />, path: '/credits' },
  { name: 'Profile', icon: <FaUser />, path: '/profile' },
];

const SidebarNavigation = () => {
  const pathname = usePathname();
  const dashboard = useDashboard();

  const isActive = (path: string) => pathname.startsWith(path);

  const handleNavigation = (path: string) => {
    const tabName = path.replace('/', '');
    dashboard?.setActiveTab(tabName);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-16 md:h-screen md:w-20 md:flex-col md:justify-start md:py-6 md:border-r md:shadow-none z-50">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => handleNavigation(item.path)}
          className={`flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-purple-600 transition-all relative group
            ${isActive(item.path) ? 'text-purple-600 font-semibold' : ''}
            md:mb-6 md:justify-center`}
        >
          <span className={`text-lg ${isActive(item.path) ? 'text-purple-600' : 'text-gray-500'}`}>
            {item.icon}
          </span>
          <span className="hidden md:block">{item.name}</span>
          {/* Active Indicator */}
          {isActive(item.path) && (
            <span className="absolute -left-2 md:left-auto md:-bottom-1 md:top-1 md:h-2 md:w-2 w-1 h-5 rounded-full bg-purple-600 md:rounded-lg md:w-1 md:h-5"></span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default SidebarNavigation;