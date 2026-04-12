import { ReactNode } from "react";
import { AdminSidebar } from "./_components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background w-full">
      <AdminSidebar />
      <main className="flex-1 w-full min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
