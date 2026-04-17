import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTAHero() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-primary px-8 py-16 md:px-16 md:py-24 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Ready to start your collection?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Build your personal <br className="hidden md:block" />
              <span className="text-indigo-200">developer ecosystem today.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers who are already organizing their favorite resources. 
              It's free, open-source, and built for the community.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/websites" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-medium border-white/20 hover:bg-white/10 text-white transition-all">
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
