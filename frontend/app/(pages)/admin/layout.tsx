import { ReactNode } from "react";
import { AdminSidebar } from "./_components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <AdminSidebar />
        <main className="flex-1 w-full min-w-0 overflow-x-hidden border-l border-border/50">
          <div className="flex items-center h-16 px-4 border-b md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
