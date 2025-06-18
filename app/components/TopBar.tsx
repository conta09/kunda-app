"use client";

import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-black text-white shadow-sm">
      {/* Left: User Greeting */}
      <div className="flex items-center gap-3">
        <UserCircleIcon className="h-10 w-10 text-gray-300" />
        <div>
          <p className="text-sm text-gray-400">Hi,</p>
          <p className="text-base font-semibold">John Snow</p>
        </div>
      </div>

      {/* Right: Notification Bell */}
      <div className="relative bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition">
        <BellIcon className="h-5 w-5 text-white" />
        {/* Optional: Notification Dot */}
        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default TopBar;
