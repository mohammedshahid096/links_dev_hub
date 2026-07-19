import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CategorySkeletonCard() {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-sm flex flex-col h-full overflow-hidden">
      <CardHeader className="pb-3 flex-none">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="h-5 w-36" />
        </div>
      </CardHeader>

      <CardContent className="pb-6 flex-grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[60%]" />
      </CardContent>
    </Card>
  );
}
