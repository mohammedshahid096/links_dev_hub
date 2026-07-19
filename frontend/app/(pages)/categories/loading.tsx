import { CategorySkeletonCard } from "./_components/category-skeleton";

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <main className="container mx-auto px-4 py-12 lg:py-20 animate-in fade-in duration-500">
        <div className="mb-10">
          <div className="h-10 md:h-12 w-64 bg-muted animate-pulse rounded-lg mb-4" />
          <div className="h-6 w-full max-w-2xl bg-muted animate-pulse rounded-lg" />
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
          <div className="h-4 w-40 bg-muted animate-pulse rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <CategorySkeletonCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
