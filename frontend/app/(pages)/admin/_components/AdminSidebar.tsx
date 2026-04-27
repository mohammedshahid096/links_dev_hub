"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { 
  Folder, 
  FolderPlus, 
  Globe, 
  PlusSquare, 
  Github, 
  Plus,
  LayoutDashboard
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true
  },
  {
    title: "Categories",
    icon: Folder,
    items: [
      {
        title: "Category List",
        href: "/admin/category",
        icon: Folder,
      },
      {
        title: "Add Category",
        href: "/admin/category/add",
        icon: FolderPlus,
      }
    ]
  },
  {
    title: "Websites",
    icon: Globe,
    items: [
      {
        title: "Website List",
        href: "/admin/website",
        icon: Globe,
      },
      {
        title: "Add Website",
        href: "/admin/website/add",
        icon: PlusSquare,
      }
    ]
  },
  {
    title: "GitHub Repos",
    icon: Github,
    items: [
      {
        title: "Repo List",
        href: "/admin/github-repos",
        icon: Github,
      },
      {
        title: "Add by Link",
        href: "/admin/github-repos/add",
        icon: Plus,
      }
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/50 hidden md:flex" collapsible="icon">
      <SidebarHeader className="h-16 flex justify-center px-4 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-primary shrink-0" />
          <span className="text-lg font-bold tracking-tight text-foreground truncate group-data-[collapsible=icon]:hidden">
            Admin Panel
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {navigation.map((section, idx) => (
          <SidebarGroup key={idx} className="mb-4">
            {!section.items ? (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === section.href}
                    tooltip={section.title}
                  >
                    <Link href={section.href!}>
                      <section.icon className="w-4 h-4 shrink-0" />
                      <span>{section.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ) : (
              <>
                <SidebarGroupLabel className="flex items-center gap-2 mb-2">
                  <section.icon className="w-4 h-4 shrink-0" />
                  <span className="uppercase tracking-wider">
                    {section.title}
                  </span>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item, itemIdx) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                      return (
                        <SidebarMenuItem key={itemIdx}>
                          <SidebarMenuButton 
                            asChild 
                            isActive={isActive}
                            tooltip={item.title}
                            className="ml-0"
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
                </SidebarGroupContent>
              </>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium truncate text-foreground">User Profile</span>
            <span className="text-[10px] text-muted-foreground truncate uppercase font-semibold tracking-wider">Sign Out / Account</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
