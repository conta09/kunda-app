// app/dashboard/page.tsx
'use client';
import { useDashboard } from '../context/DashboardContext';
import ProfileGrid from '../components/ProfileGrid';
import VibeRoomList from '../components/VibeRoomList';
import TopBar from '../components/TopBar';

const DashboardPage = () => {
  const { activeTab } = useDashboard();

  const profiles = [
    { id: 1, name: 'Lolaa, 23', info: 'Mitseró', img: '/img1.jpg', isNew: true },
    { id: 2, name: 'duygu, 24', info: '', img: '/img2.jpg' },
    { id: 3, name: 'selflove ❤️, 32', info: 'Karaoğlanoğlu', img: '/img3.jpg' },
    { id: 4, name: 'kübra, 25', info: 'Girne', img: '/img2.jpg' },
    { id: 5, name: 'Nadia, 21', info: 'Kigali', img: '/img1.jpg', isNew: true },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <ProfileGrid profiles={profiles} />;
      case 'match':
        return <VibeRoomList />;
      case 'chats':
        return <div className="text-center text-gray-500 py-8">No messages yet</div>;
      case 'live':
        return <div className="text-center text-gray-500 py-8">Live feature coming soon</div>;
      case 'credits':
        return <div className="text-center text-gray-500 py-8">Credits balance: 100</div>;
      case 'profile':
        return <div className="text-center text-gray-500 py-8">Profile settings</div>;
      default:
        return <ProfileGrid profiles={profiles} />;
    }
  };

  return (
    <div className="w-full">
      <TopBar />
      <div className="sticky top-0 bg-white z-10 px-4 py-2 shadow">
        <h2 className="text-2xl font-bold text-center mb-2 capitalize">{activeTab}</h2>
      </div>
      <div className="p-4 mb-16 md:mb-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;