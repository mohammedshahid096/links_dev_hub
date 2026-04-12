import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Link as LinkIcon, Plus, ExternalLink, Globe, Folder, Eye, Edit } from "lucide-react";
import { getAdminWebsites } from "@/api/website/admin.website";
import { getAdminCategories } from "@/api/category/admin.category";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WebsiteSearch } from "./_components/WebsiteSearch";

export default async function WebsitesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ searchTitle?: string, page?: string, limit?: string, sortBy?: string, categoryId?: string }> 
}) {
  const [token, resolvedParams] = await Promise.all([
    auth().then(a => a.getToken()),
    searchParams
  ]);

  const page = resolvedParams.page || "1";
  const limit = resolvedParams.limit || "20";
  const searchTitle = resolvedParams.searchTitle || "";
  const sortBy = resolvedParams.sortBy || "desc";
  const categoryId = resolvedParams.categoryId || "";

  let result: any = null;
  let categories: any[] = [];
  let error = null;
  
  try {
    const [websitesResponse, categoriesResponse] = await Promise.all([
      getAdminWebsites({ page, limit, searchTitle, sortBy, categoryId }, token),
      getAdminCategories(token)
    ]);
    
    if (!websitesResponse.success) {
      error = websitesResponse.data?.message || "Failed to fetch websites";
    } else {
      result = websitesResponse.data.data; // The paginated data object
    }
    
    if (categoriesResponse.success) {
      categories = categoriesResponse.data?.data || [];
    }
  } catch (err) {
    error = "Failed to connect to the server";
  }

  const websites = result?.websites || [];
  const hasNext = result?.hasNext || false;
  const hasPrevious = result?.hasPrevious || false;
  const currentPage = parseInt(page as string) || 1;

  // Function to generate the pagination URL
  const getPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (searchTitle) params.append("searchTitle", searchTitle);
    if (categoryId) params.append("categoryId", categoryId);
    if (limit !== "20") params.append("limit", limit.toString());
    if (sortBy !== "desc") params.append("sortBy", sortBy.toString());
    params.append("page", newPage.toString());
    return `/admin/website?${params.toString()}`;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6 md:gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Websites
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your websites across the platform
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
          <WebsiteSearch categories={categories} />
          <Link href="/admin/website/add">
            <Button className="w-full md:w-auto flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Website
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-lg mb-8 border border-red-200 dark:border-red-500/20">
          {error}
        </div>
      )}

      {/* Websites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {websites.map((website: any) => (
          <Card 
            key={website.id} 
            className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col h-full bg-card"
          >
            <CardHeader className="pb-2 flex-none">
              <div className="flex items-start justify-between w-full">
                <CardTitle className="text-lg font-bold flex items-center gap-2 line-clamp-1 h-7">
                  {website.iconUrl ? (
                     <img src={website.iconUrl} alt="" className="w-5 h-5 rounded-sm object-cover bg-muted shrink-0" />
                  ) : (
                    <div className="p-1 bg-primary/10 rounded-md shrink-0">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <span className="line-clamp-1 text-base text-foreground" title={website.title || website.slug}>
                    {website.title || website.slug}
                  </span>
                </CardTitle>
                <div className="flex shrink-0 ml-2 mt-0.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap font-medium border ${website.isActive ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20" : "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"}`}>
                    {website.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pb-4 pt-2 flex-grow">
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <a 
                    href={website.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline w-fit"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate max-w-[200px]" title={website.url}>{website.url}</span>
                  </a>
                  
                  {website.category?.name && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-sm w-fit border border-border/50">
                      <Folder className="w-3 h-3" />
                      <span className="font-medium">{website.category.name}</span>
                    </div>
                  )}
                </div>
                
                {website.description ? (
                  <CardDescription className="line-clamp-3 text-sm">
                    {website.description}
                  </CardDescription>
                ) : (
                  <CardDescription className="italic opacity-70">
                    No description provided.
                  </CardDescription>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 border-t text-xs text-muted-foreground flex flex-none items-center justify-between bg-muted/20">
               <div className="flex flex-wrap gap-1 overflow-hidden h-5 flex-1 mr-2">
                 {website.keywords && website.keywords.length > 0 ? (
                   <>
                     {website.keywords.slice(0, 2).map((kw: string) => (
                       <span key={kw} className="bg-muted px-2 py-0.5 rounded-sm line-clamp-1 truncate max-w-[60px]">{kw}</span>
                     ))}
                     {website.keywords.length > 2 && (
                       <span className="px-1 text-muted-foreground opacity-70 font-medium my-auto">+{website.keywords.length - 2}</span>
                     )}
                   </>
                 ) : (
                   <span className="opacity-50 italic">No tags</span>
                 )}
               </div>
               <div className="flex items-center gap-1 shrink-0">
                 <Link href={`/admin/website/view/${website.slug}`}>
                   <Button variant="ghost" size="xs" className="h-7 px-2 text-primary hover:bg-primary/10">
                     <Eye className="w-3.5 h-3.5 mr-1" />
                     <span className="hidden sm:inline">View</span>
                   </Button>
                 </Link>
                 <Link href={`/admin/website/edit/${website.slug}`}>
                   <Button variant="ghost" size="xs" className="h-7 px-2 text-primary hover:bg-primary/10">
                     <Edit className="w-3.5 h-3.5 mr-1" />
                     <span className="hidden sm:inline">Edit</span>
                   </Button>
                 </Link>
               </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {!error && websites.length === 0 && (
         <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl border-border bg-muted/5 mt-6">
            <Globe className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground">
              {searchTitle ? "No websites found matching your search" : "No websites found"}
            </h3>
            {searchTitle && (
              <p className="text-sm text-muted-foreground mt-2 mb-4">Try adjusting your search terms.</p>
            )}
            {!searchTitle && (
              <Link href="/admin/website/add" className="mt-4">
                <Button variant="outline">Add a new website</Button>
              </Link>
            )}
         </div>
      )}

      {/* Pagination Controls */}
      {!error && (hasPrevious || hasNext) && (
        <div className="mt-8 flex justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-muted-foreground hidden sm:block font-medium">
            Page {currentPage} of {result?.totalPages || 1} <span className="opacity-70 ml-2">({result?.totalCount} total)</span>
          </p>
          <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {hasPrevious ? (
              <Link href={getPaginationUrl(currentPage - 1)}>
                <Button variant="outline" size="sm">Previous</Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" disabled>Previous</Button>
            )}
            
            {hasNext ? (
              <Link href={getPaginationUrl(currentPage + 1)}>
                <Button variant="default" size="sm">Next</Button>
              </Link>
            ) : (
              <Button variant="default" size="sm" disabled>Next</Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
