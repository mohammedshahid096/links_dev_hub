import { getPublicWebsites } from "@/api/website/public.website";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Globe, ExternalLink, Folder, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function LatestWebsites() {
  let websites = [];
  try {
    const response = await getPublicWebsites({ limit: 4, sortBy: "desc" });
    if (response.success) {
      websites = response.data?.data?.websites || [];
    }
  } catch (error) {
    console.error("Failed to fetch latest websites:", error);
  }

  if (websites.length === 0) return null;

  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Latest <span className="text-primary">Discoveries</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore the most recently added resources to the platform. 
              Stay updated with the latest tools and websites curated by our community.
            </p>
          </div>
          <Link href="/explore">
            <Button variant="ghost" className="group">
              View All Resources
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}
