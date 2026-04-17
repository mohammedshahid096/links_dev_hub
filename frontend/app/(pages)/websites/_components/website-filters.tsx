"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function WebsiteFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoryId") || "";
  const initialSearch = searchParams.get("searchTitle") || "";
  const currentSort = searchParams.get("sortBy") || "desc";

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== initialSearch) {
        updateUrl("searchTitle", searchTerm);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, initialSearch]);

  const updateUrl = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      
      // Reset to page 1 when filters change
      params.delete("page");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="space-y-3">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            type="text"
            placeholder="Search websites..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        <Label>Categories</Label>
        <div className="space-y-1.5 flex flex-col">
          <button
            onClick={() => updateUrl("categoryId", "")}
            className={cn(
              "text-left px-3 py-2 rounded-md transition-colors text-sm font-medium",
              currentCategory === ""
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            All Categories
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateUrl("categoryId", category.id.toString())}
              className={cn(
                "text-left px-3 py-2 rounded-md transition-colors text-sm font-medium",
                currentCategory === category.id.toString()
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      {/* Sort By List */}
      <div className="space-y-3">
        <Label>Sort By</Label>
        <div className="space-y-1.5 flex flex-col">
          <button
            onClick={() => updateUrl("sortBy", "desc")}
            className={cn(
              "text-left px-3 py-2 rounded-md transition-colors text-sm font-medium",
              currentSort === "desc"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            Newest First
          </button>
          <button
            onClick={() => updateUrl("sortBy", "asc")}
            className={cn(
              "text-left px-3 py-2 rounded-md transition-colors text-sm font-medium",
              currentSort === "asc"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            Oldest First
          </button>
        </div>
      </div>
    </div>
  );
}
