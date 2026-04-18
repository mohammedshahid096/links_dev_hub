import { getPublicWebsiteBySlug } from "@/api/website/public.website";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/home/footer";
import { Globe, ExternalLink, Image as ImageIcon, Folder, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "../_components/share-button";
import { CopyButton } from "../_components/copy-button";

export default async function WebsiteDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  const response = await getPublicWebsiteBySlug(slug);
  
  if (!response.success || !response.data?.data) {
    notFound();
  }

  const website = response.data.data;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 flex flex-col">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-50" />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Back navigation */}
        <Link 
          href="/websites" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all websites
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Icon */}
              <div className="shrink-0 p-1 bg-card border border-border/50 rounded-2xl shadow-sm">
                {website.iconUrl ? (
                  <img src={website.iconUrl} alt={`${website.title} logo`} className="w-20 h-20 rounded-xl object-cover bg-muted" />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Globe className="w-10 h-10 text-primary" />
                  </div>
                )}
              </div>
              
              {/* Title & Description */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                    {website.title || website.slug}
                  </h1>
                  
                  {/* Action buttons */}
                  <div className="flex items-center gap-2 bg-card border border-border/50 rounded-lg p-1 shadow-sm">
                    <ShareButton url={website.url} title={website.title} className="p-2" />
                    <CopyButton url={website.url} className="p-2" />
                    <div className="w-px h-6 bg-border mx-1" />
                    <a 
                      href={website.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary text-muted-foreground transition-colors flex items-center gap-2 px-3 py-1.5 font-medium text-sm"
                    >
                      Visit <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <a href={website.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline transition-all">
                    {new URL(website.url).hostname}
                  </a>
                  {website.category?.name && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="inline-flex items-center gap-1.5 bg-secondary/50 text-secondary-foreground px-2.5 py-0.5 rounded-full text-xs font-semibold border border-border/50">
                        <Folder className="w-3.5 h-3.5" />
                        {website.category.name}
                      </span>
                    </>
                  )}
                </div>

                {website.description ? (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {website.description}
                  </p>
                ) : (
                  <p className="text-lg italic opacity-50">
                    No description available.
                  </p>
                )}
              </div>
            </div>

            {/* Keyword tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {((website.keywords && website.keywords.length > 0) ? website.keywords : []).map((keyword: string, idx: number) => (
                <span key={idx} className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default">
                  {typeof keyword === 'string' ? `#${keyword}` : ''}
                </span>
              ))}
            </div>

            <div className="h-px bg-border/50 w-full my-8" />

            {/* Embed / Iframe Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight">Live Preview</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border/50">Beta feature</span>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden border border-border/50 shadow-md bg-card group">
                {/* Browser-like header for iframe */}
                <div className="bg-muted/50 border-b border-border/50 p-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5 ml-1">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 max-w-sm mx-auto bg-background/80 rounded-md border border-border/50 text-[11px] text-muted-foreground px-3 py-1 flex items-center justify-center truncate backdrop-blur-sm">
                    {website.url}
                  </div>
                </div>
                {/* The Iframe */}
                <div className="relative aspect-video w-full bg-background flex flex-col items-center justify-center">
                  <iframe 
                    src={website.url}
                    title={`${website.title} preview`}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts"
                  />
                  
                  {/* Warning message that shows behind the iframe in case the website blocks embedding via X-Frame-Options */}
                  <div className="absolute inset-0 z-[-1] flex flex-col items-center justify-center text-center p-6 text-muted-foreground space-y-3 bg-muted/10">
                    <Globe className="w-12 h-12 opacity-50" />
                    <p className="text-sm max-w-md">
                      If this preview is blank, the target website may have blocked embedding (X-Frame-Options). 
                    </p>
                    <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm inline-flex items-center gap-1 mt-2">
                      Visit site instead <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              {/* Featured Image */}
              <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/60 backdrop-blur-sm shadow-sm flex flex-col group">
                <div className="p-4 border-b border-border/50">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    Banner
                  </h3>
                </div>
                <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden flex-1">
                  {website.imageUrl ? (
                    <img 
                      src={website.imageUrl} 
                      alt="Website preview" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 p-8 text-center text-muted-foreground opacity-60">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-sm">No preview image available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
