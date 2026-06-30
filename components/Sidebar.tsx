"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ChartSpline, ClipboardList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

type MenuItems = {
  title: string;
  url: string;
  icon: React.ReactNode;
};

const items: MenuItems[] = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: <ChartSpline className="w-4 h-4" />,
  },
  {
    title: "My Forms",
    url: "/dashboard/forms",
    icon: <ClipboardList className="w-4 h-4" />,
  },
];

const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md px-6 py-4 flex items-center justify-between transition-colors duration-300">
        <Link href="/" className="font-extrabold font-syne text-xl text-gray-900 dark:text-white tracking-tight">
          GenForm.ai
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Mobile Slide-in Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-black/40 dark:bg-black/60 backdrop-blur-sm flex">
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          <div className="bg-slate-950 text-slate-100 w-80 h-full border-l border-slate-800/80 shadow-2xl relative overflow-y-auto p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="font-extrabold font-syne text-xl tracking-tight text-white">
                  GenForm.ai
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <nav className="space-y-2">
                {items.map((item, index) => {
                  const isActive = pathname === item.url;
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center gap-3 font-syne font-medium text-sm px-4 py-3 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-600 text-white border-emerald-500/20 shadow-lg shadow-emerald-600/10"
                          : "text-slate-400 hover:text-white hover:bg-slate-900/60 border-transparent hover:border-slate-800/60"
                      }`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsible="offcanvas" className="border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-black/90 backdrop-blur-md transition-colors duration-300">
          <SidebarContent className="bg-transparent p-4 flex flex-col justify-between h-full">
            <SidebarGroup className="bg-transparent p-0">
              <SidebarGroupLabel className="flex items-center justify-between px-2 py-4 h-auto">
                <Link href={"/"} className="font-extrabold font-syne text-xl text-gray-900 dark:text-white tracking-tight">
                  GenForm.ai
                </Link>
              </SidebarGroupLabel>
              <Separator className="my-4 bg-slate-200/60 dark:bg-slate-800/80" />
              <SidebarGroupContent className="p-0">
                <SidebarMenu className="gap-2">
                  {items.map((item, index) => {
                    const isActive = pathname === item.url;
                    return (
                      <SidebarMenuItem key={index} className="px-1">
                        <SidebarMenuButton asChild className="p-0 h-auto hover:bg-transparent">
                          <Link
                            href={item.url}
                            className={`group flex items-center gap-3 font-syne font-medium text-sm px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                              isActive
                                ? "bg-emerald-600/95 text-white border-emerald-500/20 shadow-md shadow-emerald-600/10 hover:bg-emerald-600 hover:text-white"
                                : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-gray-800/50 border-transparent hover:border-slate-200 dark:hover:border-slate-800/40"
                            }`}
                          >
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </>
  );
};

export default DashboardSidebar;
