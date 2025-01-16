import { DarkMode } from "@/components/DarkMode";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="border-b">
        {/* Navbar  */}
        <nav className="flex items-center justify-between max-w-7xl mx-auto py-2">
          <Logo />
          <div className="flex items-center gap-2">
            <Link href={"/dashboard/analytics"}>
              {" "}
              <Button variant={"link"}>Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/sign-in" />
            <DarkMode /> 
          </div>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default layout;