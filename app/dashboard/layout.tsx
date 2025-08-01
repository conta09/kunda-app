// app/dashboard/layout.tsx
'use client';
import React from 'react';
import SidebarNavigation from '../components/SidebarNavigation';
import { DashboardProvider } from '../context/DashboardContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="relative flex min-h-screen w-full bg-gray-100">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-20 md:fixed md:inset-y-0 md:left-0 md:z-10">
          <SidebarNavigation />
        </div>
        
        {/* Main Content - offset for sidebar on desktop */}
        <main className="flex-1 md:ml-20 pb-16 md:pb-0">
          {children}
        </main>
        
        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <SidebarNavigation />
        </div>
      </div>
    </DashboardProvider>
  );
}