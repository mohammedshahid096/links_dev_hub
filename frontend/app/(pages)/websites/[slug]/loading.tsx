import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WebsiteDetailsLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        {/* Back navigation skeleton */}
        <div className="inline-flex items-center gap-2 mb-8">
          <ArrowLeft className="w-4 h-4 text-muted-foreground opacity-50" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Skeleton className="w-20 h-20 rounded-2xl" />
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <Skeleton className="h-10 md:h-12 w-64" />
                  <Skeleton className="h-10 w-40" />
                </div>

                <div className="flex items-center gap-2 h-5 w-48 bg-muted animate-pulse rounded" />
                
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-2/3" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-full" />
            </div>

            <div className="h-px bg-border/50 w-full my-8" />

            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="aspect-video w-full rounded-xl" />
            </div>
          </div>
          
          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/60 backdrop-blur-sm shadow-sm flex flex-col">
                <div className="p-4 border-b border-border/50">
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="aspect-video w-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
