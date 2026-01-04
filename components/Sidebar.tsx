"use client";

import React, { useEffect, useState } from "react";
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
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type MenuItems = {
  title: string;
  url: string;
  icon: React.ReactNode;
};

const items: MenuItems[] = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: <ChartSpline size={18} />,
  },
  {
    title: "My Forms",
    url: "/dashboard/forms",
    icon: <ClipboardList size={18} />,
  },
];

const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  /* 🔒 Lock body scroll when mobile sidebar is open */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* 🔹 FIXED Hamburger (does NOT scroll) */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-white dark:bg-gray-900 shadow border"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars size={20} />
        </button>
      )}


      {/* 🔹 Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl p-6"
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <FaTimes size={18} />
              </button>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>
                    <Link href="/" className="font-bold text-lg">
                      GenForm.ai
                    </Link>
                  </SidebarGroupLabel>

                  <Separator className="my-3" />

                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => {
                        const isActive = pathname.startsWith(item.url);

                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <Link
                                href={item.url}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all
                                  ${
                                    isActive
                                      ? "bg-green-50 text-green-600 dark:bg-green-900/20"
                                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
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
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar className="border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <Link href="/" className="font-bold text-lg">
                  GenForm.ai
                </Link>
              </SidebarGroupLabel>

              <Separator className="my-3" />

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = pathname.startsWith(item.url);

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.url}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all
                              ${
                                isActive
                                  ? "bg-green-50 text-green-600 dark:bg-green-900/20"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
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
