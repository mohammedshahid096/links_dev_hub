"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  Globe,
  Github,
  User,
  FolderHeart,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
} from "@/components/ui/sidebar";

const navigation = [
  {
    title: "Dashboard",
    href: "/user",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Watchlist Website",
    href: "/user/website-watchlist",
    icon: Globe,
  },
  {
    title: "Git Repo's",
    href: "/user/github-repos",
    icon: Github,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/50 hidden md:flex" collapsible="icon">
      <SidebarHeader className="h-16 flex justify-center px-4 border-b">
        <Link href="/user" className="flex items-center gap-2">
          <FolderHeart className="w-5 h-5 text-primary shrink-0" />
          <span className="text-lg font-bold tracking-tight text-foreground truncate group-data-[collapsible=icon]:hidden">
            User Center
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((item, idx) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium truncate text-foreground">My Account</span>
            <span className="text-[10px] text-muted-foreground truncate uppercase font-semibold tracking-wider">
              Manage Profile
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
