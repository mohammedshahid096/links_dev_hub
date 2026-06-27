"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAdminWebsite } from "@/api/website/admin.website";
import { Loader2, Edit, Save } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export function UpdateWebsiteForm({ 
  initialData, 
  categories = [] 
}: { 
  initialData: any;
  categories: any[];
}) {
  const [url, setUrl] = useState(initialData?.url || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [keywords, setKeywords] = useState(initialData?.keywords ? initialData.keywords.join(', ') : "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [iconUrl, setIconUrl] = useState(initialData?.iconUrl || "");
  
  // Scraped data is usually an object or text, let's keep it as text to display
  const scrapedDataStr = initialData?.scrapedData 
    ? (typeof initialData.scrapedData === 'string' ? initialData.scrapedData : JSON.stringify(initialData.scrapedData, null, 2))
    : "";
  const [scrapedData] = useState(scrapedDataStr);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      setError("Please select a category.");
      return;
    }


    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      
      let keywordsArray = undefined;
      if (typeof keywords === 'string' && keywords.trim()) {
        keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      } else if (!keywords.trim()) {
        keywordsArray = [];
      }

      // pass the same payload (or the modified object)
      const payload = {
        ...initialData,
        title,
        description,
        categoryId,
        isActive,
        keywords: keywordsArray,
        imageUrl,
        iconUrl
      };

       delete payload.id;
       delete payload.url;
       delete payload.scrapedData;
       delete payload.createdAt;
       delete payload.updatedAt;
       delete payload.category;
       delete payload.slug;
       delete payload.userId;
       delete payload.user;
       delete payload.categoryId;
       delete payload.created_at;
       delete payload.updated_at;
       delete payload.created_by;

       console.log(payload);

      const { success, data } = await updateAdminWebsite(initialData.id, payload, token);
      
      if (success) {
        router.push("/admin/website");
        router.refresh();
      } else {
        setError(data?.message || "Failed to update website.");
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
          <Edit className="w-5 h-5 text-primary" />
          Update Website
        </CardTitle>
        <CardDescription>Edit details for {url}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-3 rounded-md text-sm border border-rose-200 dark:border-rose-500/20">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium leading-none">
                Website URL <span className="text-rose-500">*</span>
              </label>
              <input
                id="url"
                type="url"
                value={url}
                disabled={true}
                className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
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
            
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium leading-none">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2 flex flex-col justify-end">
              <label className="text-sm font-medium leading-none mb-3">
                Status
              </label>
              <div className="flex items-center gap-2 h-10">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  disabled={loading}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                  {isActive ? "Active" : "Inactive"}
                </label>
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium leading-none">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                disabled={loading}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="keywords" className="text-sm font-medium leading-none">
                Keywords <span className="text-muted-foreground font-normal">(comma separated)</span>
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                placeholder="React, Tailwind CSS, Motion"
                onChange={(e) => setKeywords(e.target.value)}
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium leading-none">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
              {imageUrl && (
                <div className="mt-2 relative w-32 h-20 rounded-md overflow-hidden border bg-muted flex items-center justify-center">
                  <img src={imageUrl} alt="preview" className="object-cover w-full h-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="iconUrl" className="text-sm font-medium leading-none">
                Icon URL
              </label>
              <input
                id="iconUrl"
                type="url"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
              {iconUrl && (
                <div className="mt-2 relative w-12 h-12 rounded-md overflow-hidden border bg-muted flex items-center justify-center">
                  <img src={iconUrl} alt="icon preview" className="object-cover w-full h-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
              )}
            </div>


            <div className="space-y-2 md:col-span-2">
              <label htmlFor="scrapedData" className="text-sm font-medium leading-none">
                Scraped Field
              </label>
              <textarea
                id="scrapedData"
                value={scrapedData}
                rows={6}
                disabled={true}
                className="flex w-full rounded-md border border-input bg-muted px-3 py-2 text-xs font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 resize-none"
              />
            </div>

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
            disabled={loading || !categoryId}
            className="w-full sm:w-auto min-w-[140px]"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {loading ? "Updating..." : "Update Website"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
