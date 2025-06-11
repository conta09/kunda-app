// components/layouts/SidebarLayout.tsx

import React from "react";
import { SidebarProvider, SidebarTrigger, AppSidebar } from "@/components/ui/sidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
