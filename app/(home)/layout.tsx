import React from "react";
import Logo from "@/components/Logo";
import { UserButton } from "@clerk/nextjs";
import { DarkMode } from "@/components/DarkMode";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="border-b">
        <nav className="flex items-center justify-between max-w-7xl mx-auto py-2 px-10">
          <Logo />
          <div className="flex items-center space-x-4">
            {/* Adding space between items */}
            <button>Dashboard</button>
            <UserButton />
            <DarkMode/>
          </div>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;

