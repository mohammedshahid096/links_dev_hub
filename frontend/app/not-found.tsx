import Link from 'next/link'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/home/footer"
import { SearchX, Home, ArrowLeft } from 'lucide-react'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "We couldn't find the page you were looking for. Head back to DevHub and explore developer tools and resources.",
  robots: { index: false, follow: false },
};


export default function NotFound() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 flex flex-col">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in-95 duration-500 min-h-[70vh]">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative bg-card border border-border/50 w-24 h-24 flex items-center justify-center rounded-3xl shadow-xl rotate-12 mx-auto">
            <SearchX className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 text-foreground">
          4<span className="text-primary">0</span>4
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
          Page Not Found
        </h2>
        
        <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
          We looked everywhere, but we couldn't find the page or resource you were looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
          <Link 
            href="/websites"
            className="inline-flex items-center gap-2 bg-card hover:bg-muted text-foreground border border-border/50 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Websites
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
