import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Folder } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  category: {
    id: string;
    slug: string;
    name: string;
    description: string;
    icon: string | null;
    color: string | null;
    isActive: boolean;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/60 backdrop-blur-sm flex flex-col h-full overflow-hidden">
      <CardHeader className="pb-3 flex-none">
        <Link href={`/websites?categoryId=${category.id}`} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <Folder className="w-5 h-5 text-primary" />
          </div>
          <CardTitle
            className="text-base font-bold line-clamp-1 group-hover:text-primary transition-colors"
            title={category.name}
          >
            {category.name}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="pb-6 flex-grow relative">
        <Link href={`/websites?categoryId=${category.id}`} className="absolute inset-0 z-0" />
        <div className="relative z-10 pointer-events-none">
          {category.description ? (
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
              {category.description}
            </CardDescription>
          ) : (
            <CardDescription className="italic opacity-50 text-xs">
              No description provided.
            </CardDescription>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
