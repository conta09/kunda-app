// components/TopBar.tsx
'use client';
import { useDashboard } from '../context/DashboardContext';

const TopBar = () => {
  const { activeTab } = useDashboard();

  return (
    <div className="bg-white p-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
        <div className="text-sm text-gray-500">Welcome back!</div>
      </div>
    </div>
  );
};

export default TopBar;