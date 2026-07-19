import { Folder } from "lucide-react";

export function CategoriesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl border-border bg-muted/10 h-64">
      <Folder className="w-12 h-12 text-muted-foreground/30 mb-4" />
      <h3 className="text-xl font-bold text-foreground">No categories found</h3>
      <p className="text-muted-foreground mt-2 max-w-sm">
        There are no categories available at the moment. Please check back later.
      </p>
    </div>
  );
}
