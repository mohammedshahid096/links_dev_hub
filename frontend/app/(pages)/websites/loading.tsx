import { WebsiteSkeletonCard } from "./_components/website-skeleton";

export default function WebsitesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <main className="container mx-auto px-4 py-12 lg:py-20 animate-in fade-in duration-500">
        <div className="mb-10">
          <div className="h-10 md:h-12 w-64 bg-muted animate-pulse rounded-lg mb-4" />
          <div className="h-6 w-full max-w-2xl bg-muted animate-pulse rounded-lg" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Skeleton */}
          <aside className="lg:w-1/4 xl:w-1/5 shrink-0">
            <div className="sticky top-24 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                <div className="h-9 w-full bg-muted animate-pulse rounded-md" />
              </div>
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="grid grid-cols-1 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-8 w-full bg-muted/50 animate-pulse rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <div className="flex-1">
            <div className="mb-6 h-10 w-full border-b border-border/50 pb-4">
              <div className="h-4 w-40 bg-muted animate-pulse rounded" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <WebsiteSkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
