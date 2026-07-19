"use client";

import Link from "next/link";
import { Menu, Layers, Star, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const navLinks = [
  { href: "/websites", label: "Websites" },
  { href: "/github-repos", label: "GitHub" },
  { href: "/categories", label: "Categories" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border/50 bg-card/60 backdrop-blur-sm hover:bg-accent transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-6 border-b border-border/50">
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Links Dev Hub
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-primary/5 border-r-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {link.label}
                </Link>
              </SheetClose>
            );
          })}

          <SheetClose asChild>
            <Link
              href="/user/website-watchlist"
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                pathname === "/user/website-watchlist"
                  ? "text-primary bg-primary/5 border-r-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Star className="w-4 h-4" />
              Watchlist
            </Link>
          </SheetClose>
        </nav>

        <div className="mt-auto border-t border-border/50 p-6">
          <SignedIn>
            <SheetClose asChild>
              <Link
                href="/user"
                className="flex items-center justify-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all w-full"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </SheetClose>
          </SignedIn>
          <SignedOut>
            <SheetClose asChild>
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2 text-sm font-medium border border-primary/20 bg-primary/5 text-primary px-5 py-2.5 rounded-full hover:bg-primary/10 transition-all w-full"
              >
                Sign In
              </Link>
            </SheetClose>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
