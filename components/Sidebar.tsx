import React, { JSX } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import UpgradeButton from "./UpgradeButton";
import { currentUser } from "@clerk/nextjs/server";

type MenuItems = {
  title: string;
  url: string;
  icon: JSX.Element;
};

const items: MenuItems[] = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: <ChartSpline />,
  },
  {
    title: "My Forms",
    url: "/dashboard/forms",
    icon: <ClipboardList />,
  },
];

const DashboardSidebar = async () => {
  const user = await currentUser();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <Link href={"/"} className="font-bold text-lg">
              GenForm.ai
            </Link>
          </SidebarGroupLabel>
          <Separator className="my-2"/>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: MenuItems, index: number) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UpgradeButton userId={user?.id}/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;