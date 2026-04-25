"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function GithubFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [limit, setLimit] = useState(searchParams.get("limit") || "12");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "desc");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", newSort);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(newLimit);
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-4 ml-1">Search</h3>
        <form onSubmit={handleSearch} className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search repos..."
            className="w-full bg-background/50 border border-border/50 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-4 ml-1">Sort By</h3>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Newest First", value: "desc" },
            { label: "Oldest First", value: "asc" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                sortBy === option.value 
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm" 
                  : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border/40">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-4 ml-1">Items Per Page</h3>
        <div className="grid grid-cols-3 gap-2">
          {["12", "24", "48"].map((val) => (
            <button
              key={val}
              onClick={() => handleLimitChange(val)}
              className={`flex items-center justify-center py-2 rounded-lg text-sm transition-all duration-200 border ${
                limit === val 
                  ? "bg-primary/10 border-primary text-primary font-bold shadow-sm" 
                  : "bg-background/40 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
