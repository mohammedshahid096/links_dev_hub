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
    title: "GitHub Paths",
    icon: Github,
    items: [
      {
        title: "GitHub List",
        href: "/admin/github",
        icon: Github,
      },
      {
        title: "Add New GitHub",
        href: "/admin/github/add",
        icon: Plus,
      }
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] lg:h-screen border-r bg-muted/20 hidden md:flex flex-col sticky top-0 md:top-16 lg:top-0">
      <div className="p-6">
        <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-primary" />
          Admin Panel
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {navigation.map((section, idx) => (
          <div key={idx}>
            {!section.items ? (
              <Link
                href={section.href!}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === section.href ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                <section.icon className="w-4 h-4" />
                {section.title}
              </Link>
            ) : (
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </div>
                {section.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ml-2",
                        isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border/50 mt-auto">
        <div className="flex items-center gap-3 px-3 py-2">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate text-foreground">User Profile</span>
            <span className="text-[10px] text-muted-foreground truncate uppercase font-semibold tracking-wider">Sign Out / Account</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
