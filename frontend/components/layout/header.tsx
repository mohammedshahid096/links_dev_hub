import Link from "next/link";
import { Layers, Star, LayoutDashboard } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-50 animate-in fade-in duration-500">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">Links Dev Hub</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="/websites" className="hover:text-foreground transition-colors">Websites</Link>
        <Link href="/github-repos" className="hover:text-foreground transition-colors">GitHub</Link>
        <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
        <Link href="/watchlist" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Star className="w-3.5 h-3.5" /> Watchlist
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <SignedIn>
          <Link 
            href="/admin/website" 
            className="flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Admin Dashboard</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link 
            href="/sign-in" 
            className="flex items-center gap-2 text-sm font-medium border border-primary/20 bg-primary/5 text-primary px-5 py-2.5 rounded-full hover:bg-primary/10 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            Sign In
          </Link>
        </SignedOut>
      </div>
    </header>
  );
}
