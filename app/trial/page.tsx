"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// Types
interface User {
  id: string;
  name: string;
  age: number;
  photos: string[];
  distance: number;
  isOnline: boolean;
  location: {
    lat: number;
    lng: number;
  };
  interests?: string[];
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'online' | 'profile'>('map');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for users
  const users: User[] = [
    {
      id: '1',
      name: 'Emma',
      age: 28,
      photos: ['/profile1.jpg'],
      distance: 2.5,
      isOnline: true,
      location: { lat: 37.7749, lng: -122.4194 },
      interests: ['Travel', 'Photography', 'Coffee']
    },
    // ... other users with interests
  ];

  const onlineUsers = users.filter(user => user.isOnline);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSendRequest = useCallback((userId: string) => {
    alert(`Request sent to ${userId}`);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-indigo-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'map':
        return <MapView users={users} onSelectUser={setSelectedUser} />;
      case 'online':
        return <OnlineUsersList users={onlineUsers} onSendRequest={handleSendRequest} />;
      case 'profile':
        return <UserProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <Image 
          src="/logo.svg" 
          alt="Logo" 
          width={140}
          height={40}
          className="h-8 w-auto"
          priority
        />
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex min-h-[calc(100vh-140px)]">
        {/* Sidebar for desktop */}
        <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Content Area */}
        <div className="flex-1">
          <div className="transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Selected User Modal */}
      {selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
          onSendRequest={handleSendRequest} 
        />
      )}

      {/* Bottom Navigation Bar (Mobile) */}
      <MobileBottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

// Desktop Sidebar Component
const DesktopSidebar: React.FC<{ 
  activeTab: string; 
  setActiveTab: (tab: 'map' | 'online' | 'profile') => void 
}> = ({ activeTab, setActiveTab }) => (
  <aside className="hidden lg:block w-64 mr-6">
    <nav className="bg-white rounded-2xl shadow-sm p-4 space-y-1">
      {[
        { id: 'map', label: 'Discover', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
        { id: 'online', label: 'Matches', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
      ].map((item) => (
        <button
          key={item.id}
          className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 ${
            activeTab === item.id 
              ? 'bg-indigo-50 text-indigo-600 font-medium' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab(item.id as any)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
          </svg>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
    
    <div className="mt-6 bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <div>
          <h3 className="font-medium">Alex Johnson</h3>
          <p className="text-sm text-gray-500">Premium Member</p>
        </div>
      </div>
    </div>
  </aside>
);

// Map View Component
const MapView: React.FC<{ 
  users: User[]; 
  onSelectUser: (user: User) => void 
}> = ({ users, onSelectUser }) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
    <div className="p-5 border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">Discover Nearby</h2>
      <p className="text-sm text-gray-500">People in your area</p>
    </div>
    <div className="h-[500px] relative bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Map placeholder with subtle animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <div className="relative mx-auto w-64 h-64 mb-6">
            <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            </div>
            {/* User markers */}
            {users.map((user, index) => (
              <button
                key={user.id}
                className={`absolute ${index % 4 === 0 ? 'top-1/4 left-1/4' : 
                           index % 4 === 1 ? 'top-1/3 right-1/4' : 
                           index % 4 === 2 ? 'bottom-1/4 left-1/3' : 'bottom-1/3 right-1/3'} 
                           transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110`}
                onClick={() => onSelectUser(user)}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <span className="font-medium">{user.name.charAt(0)}</span>
                  </div>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
              </button>
            ))}
          </div>
          <p className="text-gray-600 mb-4">Interactive map coming soon</p>
          <p className="text-sm text-gray-500">Real-time location-based matching in development</p>
        </div>
      </div>
    </div>
  </div>
);

// Online Users List Component
const OnlineUsersList: React.FC<{ 
  users: User[]; 
  onSendRequest: (userId: string) => void 
}> = ({ users, onSendRequest }) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
    <div className="p-5 border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">Online Now</h2>
      <p className="text-sm text-gray-500">{users.length} people available</p>
    </div>
    <div className="divide-y divide-gray-100">
      {users.length === 0 ? (
        <div className="p-12 text-center">
          <div className="mx-auto bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-gray-600">No users online at the moment</p>
          <p className="text-sm text-gray-500 mt-2">Check back later to find matches</p>
        </div>
      ) : (
        users.map(user => (
          <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-medium shadow">
                  {user.name.charAt(0)}
                </div>
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-semibold">{user.name}, {user.age}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{user.distance} km away</span>
                  <span className="mx-2">•</span>
                  <span>Online now</span>
                </div>
                {user.interests && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {user.interests.slice(0, 3).map((interest, idx) => (
                      <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-full transition duration-300 flex items-center shadow-sm hover:shadow-md"
              onClick={() => onSendRequest(user.id)}
            >
              Connect
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

// User Profile Component
const UserProfile: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
    <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
      <button className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </div>
    <div className="p-6 -mt-16">
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white">
          AJ
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Alex Johnson</h2>
      <p className="text-center text-gray-600 mb-8">Photographer & Traveler</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-xl text-center">
          <p className="text-lg font-semibold text-indigo-600">29</p>
          <p className="text-sm text-gray-500">Age</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl text-center">
          <p className="text-lg font-semibold text-indigo-600">5 km</p>
          <p className="text-sm text-gray-500">Distance</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl text-center">
          <p className="text-lg font-semibold text-indigo-600">12</p>
          <p className="text-sm text-gray-500">Matches</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">About Me</h3>
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-600">
            Passionate about photography and travel. Loves hiking, coffee shops, and indie music. 
            Looking for someone to share adventures with.
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {['Photography', 'Travel', 'Hiking', 'Coffee', 'Music', 'Art'].map((interest, idx) => (
            <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm">
              {interest}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl transition duration-300">
          Edit Profile
        </button>
        <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl shadow-sm hover:shadow-md transition duration-300">
          Settings
        </button>
      </div>
    </div>
  </div>
);

// User Modal Component
const UserModal: React.FC<{ 
  user: User; 
  onClose: () => void; 
  onSendRequest: (userId: string) => void 
}> = ({ user, onClose, onSendRequest }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
    <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl">
      <div className="relative h-64 bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
        <div className="text-white text-6xl font-bold">{user.name.charAt(0)}</div>
        <button 
          className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}, {user.age}</h2>
        <div className="flex items-center text-gray-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{user.distance} km away</span>
          {user.isOnline && (
            <span className="ml-4 flex items-center text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Online now
            </span>
          )}
        </div>
        
        {user.interests && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, idx) => (
                <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <button 
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3.5 rounded-xl font-medium shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center"
          onClick={() => {
            onSendRequest(user.id);
            onClose();
          }}
        >
          Send Connection Request
        </button>
      </div>
    </div>
  </div>
);

// Mobile Bottom Bar Component
const MobileBottomBar: React.FC<{ 
  activeTab: string; 
  setActiveTab: (tab: 'map' | 'online' | 'profile') => void 
}> = ({ activeTab, setActiveTab }) => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-40">
    <div className="flex justify-around">
      {[
        { id: 'map', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
        { id: 'online', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { id: 'profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
      ].map((item) => (
        <button 
          key={item.id}
          className={`py-3 px-4 flex flex-col items-center transition-colors duration-200 ${
            activeTab === item.id ? 'text-indigo-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab(item.id as any)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
          </svg>
          <span className="text-xs mt-1">
            {item.id === 'map' ? 'Discover' : 
             item.id === 'online' ? 'Matches' : 'Profile'}
          </span>
        </button>
      ))}
    </div>
  </nav>
);

export default App;