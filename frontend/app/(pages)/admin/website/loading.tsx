import { Skeleton } from "@/components/ui/skeleton";
import { WebsiteSkeletonCard } from "../../websites/_components/website-skeleton";

export default function AdminWebsitesLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6 md:gap-4">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
          {/* Search bar skeleton */}
          <div className="h-9 w-full md:w-[450px] bg-muted animate-pulse rounded-md" />
          {/* Add Website button skeleton */}
          <div className="h-9 w-full sm:w-32 bg-muted animate-pulse rounded-md" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <WebsiteSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
