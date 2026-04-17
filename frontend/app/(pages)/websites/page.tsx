import { getPublicWebsites } from "@/api/website/public.website";
import { getPublicCategories } from "@/api/category/public.category";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Globe, ExternalLink, Folder } from "lucide-react";
import { WebsiteFilters } from "./_components/website-filters";
import { WebsitePagination } from "./_components/website-pagination";

export default async function WebsitesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ searchTitle?: string, page?: string, categoryId?: string }> 
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page || "1";
  const limit = "12";
  const searchTitle = resolvedParams.searchTitle || "";
  const categoryId = resolvedParams.categoryId || "";
  const sortBy = "desc";

  let websitesData: any = null;
  let categories: any[] = [];
  let error = null;
  
  try {
    const [websitesResponse, categoriesResponse] = await Promise.all([
      getPublicWebsites({ page, limit, searchTitle, sortBy, categoryId }),
      getPublicCategories()
    ]);
    
    if (!websitesResponse.success) {
      error = websitesResponse.data?.message || "Failed to fetch websites";
    } else {
      websitesData = websitesResponse.data.data; 
    }
    
    if (categoriesResponse.success) {
      categories = categoriesResponse.data?.data || [];
    }
  } catch (err) {
    error = "Failed to connect to the server";
  }

  const websites = websitesData?.websites || [];
  const currentPage = parseInt(page as string) || 1;
  const totalPages = websitesData?.totalPages || 1;
  const totalCount = websitesData?.totalCount || 0;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 animate-in fade-in duration-500 min-h-[80vh]">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Explore <span className="text-primary">Websites</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Browse through our curated collection of essential developer resources, tools, and portfolios.
        </p>
      </div>

      {error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20 mb-8">
          {error}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4 xl:w-1/5 shrink-0">
            <div className="sticky top-24 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 shadow-sm">
              <WebsiteFilters categories={categories} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
              <p className="text-sm font-medium text-muted-foreground">
                Showing <span className="text-foreground">{websites.length}</span> of <span className="text-foreground">{totalCount}</span> results
              </p>
            </div>

            {websites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {websites.map((website: any) => (
                  <Card 
                    key={website.id} 
                    className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/60 backdrop-blur-sm flex flex-col h-full overflow-hidden"
                  >
                    <CardHeader className="pb-3 flex-none">
                      <div className="flex items-center gap-3">
                        {website.iconUrl ? (
                          <img src={website.iconUrl} alt="" className="w-8 h-8 rounded-lg object-cover bg-muted border border-border/50" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Globe className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <CardTitle className="text-base font-bold line-clamp-1 group-hover:text-primary transition-colors">
                          {website.title || website.slug}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-4 flex-grow">
                      {website.description ? (
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                          {website.description}
                        </CardDescription>
                      ) : (
                        <CardDescription className="italic opacity-50 text-xs">
                          No description provided.
                        </CardDescription>
                      )}
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {website.category?.name && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground border border-border/50">
                            <Folder className="w-2.5 h-2.5" />
                            {website.category.name}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-4 border-t border-border/50 bg-muted/20 mt-auto">
                      <a 
                        href={website.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span className="truncate max-w-[150px]">{new URL(website.url).hostname}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl border-border bg-muted/10 h-64">
                <Globe className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-bold text-foreground">No websites found</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">
                  We couldn't find any resources matching your current filters. Try adjusting your search term or selecting a different category.
                </p>
              </div>
            )}

            {/* Pagination Component mapped to URL */}
            <WebsitePagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      )}
    </div>
  )
}
