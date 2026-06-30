import DashboardSidebar from "@/components/Sidebar"; 
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50/50 dark:bg-gray-950/20">
        <header className="hidden md:flex h-14 shrink-0 items-center px-6 border-b border-slate-100 dark:border-slate-800/80 bg-white/40 dark:bg-black/20 backdrop-blur-md sticky top-0 z-30 transition-colors duration-300">
          <SidebarTrigger className="text-gray-400 hover:text-gray-900 dark:hover:text-white border border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-gray-900 h-8 w-8 rounded-lg transition-colors" />
        </header>
        <main className="mx-6 my-6 flex-1 pt-14 md:pt-0">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default layout;