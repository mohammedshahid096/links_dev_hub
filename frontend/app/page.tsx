import { ArrowRight, Globe, Star, Search, Layers, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FeaturesHero } from "@/components/home/features-hero";
import { LatestWebsites } from "@/components/home/latest-websites";
import { CTAHero } from "@/components/home/cta-hero";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-50" />
      
      {/* Navbar */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-50 animate-in fade-in duration-500">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">Links Dev Hub</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/explore" className="hover:text-foreground transition-colors">Explore</Link>
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

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16 sm:pt-32 sm:pb-24 relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--tw-shadow-color)] shadow-primary" />
              <span className="text-sm font-medium">Platform now in public beta</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Your Ultimate{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-500 drop-shadow-sm">
                Developer Watchlist
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Discover, save, and organize essential developer websites and top-tier GitHub repositories. Create your personalized toolkit and never lose an important dev link again.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link 
                href="/explore" 
                className="flex items-center justify-center gap-2 w-full sm:w-auto h-14 px-8 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_var(--tw-shadow-color)] shadow-primary"
              >
                <Search className="w-5 h-5" />
                Explore Sites & Repos
              </Link>
              <Link 
                href="/watchlist" 
                className="flex items-center justify-center gap-2 w-full sm:w-auto h-14 px-8 rounded-full bg-secondary/50 text-secondary-foreground font-medium text-lg border border-border backdrop-blur-sm hover:bg-secondary hover:border-muted-foreground/30 hover:scale-105 active:scale-95 transition-all group"
              >
                View My Watchlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Abstract UI Decorative Elements */}
          <div className="mt-24 relative max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-0 pointer-events-none" />
            
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
              <div className="h-12 border-b border-border/50 bg-muted/20 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
                <div className="ml-4 h-6 max-w-sm w-full bg-background/50 rounded-md border border-border/50 flex items-center px-3 mx-auto">
                  <Globe className="w-3 h-3 text-muted-foreground mr-2" />
                  <span className="text-[11px] text-muted-foreground font-mono">devhub.app/watchlist</span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 grid gap-5 grid-cols-1 md:grid-cols-3 bg-gradient-to-b from-transparent to-muted/5 relative">
                <div className="rounded-xl border border-border/60 bg-card/80 p-6 shadow-lg space-y-4 hover:border-primary/50 transition-all hover:-translate-y-1 relative group">
                  <div className="absolute top-5 right-5 text-primary">
                    <Globe className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">
                    <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Vercel</h3>
                    <p className="text-sm text-muted-foreground mt-1">Frontend Cloud Platform</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/80 p-6 shadow-lg space-y-4 hover:border-blue-500/50 transition-all hover:-translate-y-1 relative group md:-translate-y-4">
                  <div className="absolute top-5 right-5 text-blue-500">
                    <Layers className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/20">
                     <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">React</h3>
                    <p className="text-sm text-muted-foreground mt-1">Library for web and native UI</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/80 p-6 shadow-lg space-y-4 hover:border-emerald-500/50 transition-all hover:-translate-y-1 relative group md:translate-y-2 hidden md:block">
                  <div className="absolute top-5 right-5 text-emerald-500">
                    <Globe className="w-5 h-5 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                    <div className="w-0 h-0 border-l-[14px] border-l-transparent border-b-[24px] border-b-emerald-500 border-r-[14px] border-r-transparent drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Supabase</h3>
                    <p className="text-sm text-muted-foreground mt-1">Open source Firebase alt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Latest Websites Section */}
        <LatestWebsites />

        {/* Features Grid Hero */}
        <FeaturesHero />

        {/* Call to Action Hero */}
        <CTAHero />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
