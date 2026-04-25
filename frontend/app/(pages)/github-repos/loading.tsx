import { Skeleton } from "@/components/ui/skeleton";
import { Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

function GithubRepoSkeletonCard() {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-sm flex flex-col h-full overflow-hidden">
      <CardHeader className="pb-3 flex-none">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-5 w-32" />
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex-grow space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border/50 bg-muted/20 mt-auto">
        <div className="w-full flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default function GithubReposLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <main className="container mx-auto px-4 py-12 lg:py-20 animate-in fade-in duration-500">
        <div className="mb-10">
          <Skeleton className="h-10 md:h-12 w-80 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="lg:w-1/4 xl:w-1/5 shrink-0">
            <div className="sticky top-24 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 shadow-sm space-y-8">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-20" />
                <div className="space-y-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 h-10 w-full border-b border-border/50 pb-4">
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <GithubRepoSkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
