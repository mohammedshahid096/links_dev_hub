import { getAdminWebsiteBySlug } from "@/api/website/admin.website";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Globe, ExternalLink, Calendar, CheckCircle2, XCircle, Folder } from "lucide-react";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function WebsiteViewPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { getToken } = await auth();
  const token = await getToken();
  
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { success, data } = await getAdminWebsiteBySlug(slug, token);
  
  if (!success || !data?.data) {
    return (
      <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Website Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find the website you're looking for or it doesn't exist.</p>
        <Link href="/admin/website">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2"/> Back to Websites</Button>
        </Link>
      </div>
    );
  }

  const website = data.data;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl animate-in fade-in duration-500 pb-20">
      <Link href="/admin/website" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Websites
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {website.iconUrl ? (
                    <img src={website.iconUrl} alt="Website Icon" className="w-12 h-12 rounded-md object-contain bg-muted p-1" />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      {website.title || website.slug}
                    </CardTitle>
                    <a 
                      href={website.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-primary hover:underline mt-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {website.url}
                    </a>
                  </div>
                </div>
                {website.isActive ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-semibold shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 text-xs font-semibold shrink-0">
                    <XCircle className="w-4 h-4" />
                    Inactive
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {website.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                    <p className="text-foreground leading-relaxed text-sm bg-muted/40 p-4 rounded-lg border border-border/50">
                      {website.description}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Category</h3>
                    <div className="flex items-center gap-2 text-sm bg-background border rounded-md p-3">
                      <Folder className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">
                        {website.category?.name || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Date Added</h3>
                    <div className="flex items-center gap-2 text-sm bg-background border rounded-md p-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">
                        {new Date(website.created_at).toLocaleDateString(undefined, { 
                          year: 'numeric', month: 'long', day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {website.keywords && website.keywords.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Keywords / Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {website.keywords.map((kw: string) => (
                        <span key={kw} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="w-full">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Raw Scraped Data
            </h3>
            <div className="bg-[#1e1e1e] rounded-lg p-4 overflow-x-auto shadow-inner border border-border/50">
              <pre className="text-xs text-[#d4d4d4] font-mono leading-relaxed">
                <code>{JSON.stringify(website.scrapedData || {}, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
