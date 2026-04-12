"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function WebsiteSearch({ categories = [] }: { categories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTitle") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchTerm) {
      params.set("searchTitle", searchTerm);
    } else {
      params.delete("searchTitle");
    }
    
    if (categoryId) {
      params.set("categoryId", categoryId);
    } else {
      params.delete("categoryId");
    }

    params.set("page", "1"); // Reset context
    router.push(pathname + "?" + params.toString());
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-1 w-full xl:min-w-[450px] items-center flex-col sm:flex-row gap-2">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search websites by title..."
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="flex h-9 w-full sm:w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <Button type="submit" size="sm" variant="secondary" className="w-full sm:w-auto">
        Filter
      </Button>
    </form>
  );
}
