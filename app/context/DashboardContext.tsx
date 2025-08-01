// app/context/DashboardContext.tsx
'use client';

import React, { createContext, useState, useContext } from 'react';

type DashboardContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState('discover');

  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};