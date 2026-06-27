import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCategoriesLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>

        <div className="h-10 w-40 bg-muted animate-pulse rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border bg-card rounded-xl overflow-hidden">
            <div className="h-1 bg-muted animate-pulse" />
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-md" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-full md:w-3/4" />
              </div>

              <div className="pt-4 border-t flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
