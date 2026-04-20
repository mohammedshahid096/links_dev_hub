import { ArrowRight, Globe, Search } from "lucide-react";
import Link from "next/link";
import { FeaturesHero } from "@/components/home/features-hero";
import { LatestWebsites } from "@/components/home/latest-websites";
import { CTAHero } from "@/components/home/cta-hero";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/layout/header";
import { HeroDecorativeUI } from "@/components/home/hero-decorative-ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevHub — Your Ultimate Developer Watchlist",
  description:
    "Discover, save, and organise essential developer websites and top-tier GitHub repositories. Create your personalised developer toolkit and never lose an important dev link again.",
  openGraph: {
    title: "DevHub — Your Ultimate Developer Watchlist",
    description:
      "Your one-stop hub for curating the best developer tools, websites, and GitHub repositories.",
    url: "https://devhub.app",
  },
};


export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-50" />
      
      {/* Navbar */}
      {/* Navbar */}
      <Header />

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
                href="/websites" 
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

          {/* Animated Beam Decorative UI */}
          <HeroDecorativeUI />
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
