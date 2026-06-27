"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addWebsiteByUrl } from "@/api/website/admin.website";
import { Loader2, Link as LinkIcon, Plus } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export function AddWebsiteForm({ categories = [] }: { categories: any[] }) {
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !categoryId) {
      setError("Please provide a valid URL and select a category.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const { success, data } = await addWebsiteByUrl({ 
        url: url.trim(),
        categoryId
      }, token);
      
      if (success) {
        router.push("/admin/website");
        router.refresh();
      } else {
        setError(data?.message || "Failed to add website. It may already exist.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-primary" />
          Add New Website
        </CardTitle>
        <CardDescription>Enter a website URL. Our system will automatically scrape the metadata for it.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-3 rounded-md text-sm border border-rose-200 dark:border-rose-500/20">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium leading-none">
              Website URL <span className="text-rose-500">*</span>
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={loading}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground mt-1">Must include http:// or https://</p>
          </div>

          <div className="space-y-2">
             <label htmlFor="category" className="text-sm font-medium leading-none">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Select a category...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t mt-4 bg-muted/10">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/website")}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !url.trim() || !categoryId}
            className="w-full sm:w-auto min-w-[140px]"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            {loading ? "Scraping & Adding..." : "Add Website"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
