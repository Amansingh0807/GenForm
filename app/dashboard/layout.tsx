import DashboardSidebar from "@/components/Sidebar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <DashboardSidebar />
      <SidebarInset className="px-6 py-4 pl-12">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
