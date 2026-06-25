import { ReactNode } from "react";
import { UserSidebar } from "./_components/UserSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { getProfileApi } from "@/api/auth/profile";
import { notFound } from "next/navigation";

export default async function UserLayout({ children }: { children: ReactNode }) {
  const token = await auth().then((a) => a.getToken());

  if (!token) {
    notFound();
  }

  try {
    const { success, data } = await getProfileApi(token);
    // Only allow 'user' role to access user-level pages
    if (!success || data?.data?.role !== "user") {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <UserSidebar />
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
