import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function WebsiteSkeletonCard() {
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
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-border/50 bg-muted/20 mt-auto">
        <div className="w-full flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="w-6 h-6 rounded-md" />
            <Skeleton className="w-6 h-6 rounded-md" />
            <Skeleton className="w-6 h-6 rounded-md" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
