import { Skeleton } from "@/components/ui/skeleton";
import { Github } from "lucide-react";

export default function AdminGithubReposLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-muted animate-pulse rounded-lg flex items-center gap-2">
             <Github className="w-7 h-7 text-muted-foreground/30" />
             <div className="h-8 w-48 bg-muted rounded" />
          </div>
          <div className="h-4 w-72 bg-muted animate-pulse rounded" />
        </div>

        <div className="h-10 w-40 bg-muted animate-pulse rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border border-border/50 bg-card rounded-xl p-4 space-y-4">
            <div className="flex justify-between items-start">
               <div className="flex gap-2 items-center">
                 <Skeleton className="w-5 h-5 rounded" />
                 <Skeleton className="h-5 w-24" />
               </div>
               <Skeleton className="h-4 w-12 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <div className="flex gap-2">
               <Skeleton className="h-4 w-16 rounded-full" />
               <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <div className="pt-4 border-t flex justify-between">
               <Skeleton className="h-3 w-16" />
               <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
