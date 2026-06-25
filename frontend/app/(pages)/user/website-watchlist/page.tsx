"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/home/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getWatchlistsApi,
  deleteWatchlistApi,
  WatchlistItem,
} from "@/api/user/watchlist";
import { ShareButton } from "@/app/(pages)/websites/_components/share-button";
import { CopyButton } from "@/app/(pages)/websites/_components/copy-button";
import {
  Globe,
  ExternalLink,
  BookmarkX,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  FolderHeart,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export default function WebsiteWatchlistPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [watchlists, setWatchlists] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Toast state
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const fetchWatchlist = async (currentPage = page, search = searchTitle) => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const token = await getToken();
      const response = await getWatchlistsApi(token, {
        page: currentPage,
        limit: 12,
        title: search,
      });

      if (response.success && response.data?.data) {
        setWatchlists(response.data.data.watchlists || []);
        setTotalPages(response.data.data.totalPages || 1);
        setTotalCount(response.data.data.totalCount || 0);
        setError(null);
      } else {
        setError(response.data?.message || "Failed to fetch watchlist");
      }
    } catch (err) {
      setError("An error occurred while loading your watchlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchWatchlist(1, "");
    }
  }, [isLoaded]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchWatchlist(1, searchTitle);
  };

  const handleUnwatchlist = async (id: string, websiteTitle: string) => {
    setDeletingId(id);
    try {
      const token = await getToken();
      const response = await deleteWatchlistApi(id, token);

      if (response.success) {
        showToast(`"${websiteTitle}" removed from watchlist`);
        // Remove item from state with animation delay support
        setWatchlists((prev) => prev.filter((item) => item.id !== id));
        setTotalCount((prev) => Math.max(0, prev - 1));
      } else {
        showToast(response.data?.message || "Failed to remove item", "error");
      }
    } catch (err) {
      showToast("An error occurred while removing from watchlist", "error");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoaded && !isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-card border border-border/50 max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-sm">
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              You must be signed in to view your personalized website watchlist.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl font-medium transition-colors w-full"
            >
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 flex flex-col">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border border-border/50 bg-card/90 backdrop-blur-md"
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive shrink-0" />
            )}
            <span className="text-sm font-medium text-foreground">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-50" />
      
      <Header />

      <main className="container mx-auto px-4 py-12 lg:py-20 flex-1 animate-in fade-in duration-500 min-h-[75vh] max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <FolderHeart className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                User Area
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              My <span className="text-primary">Watchlist</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
              Manage your saved developer resources, tools, and design system inspirations.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search watchlisted websites..."
                className="pl-9 h-10 border-border/50 bg-card/50 backdrop-blur-xs placeholder:text-muted-foreground"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm" className="h-10 px-4 rounded-lg">
              Search
            </Button>
          </form>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 mb-8 max-w-lg flex items-center gap-3">
            <XCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <Card key={idx} className="border-border/50 bg-card/60 backdrop-blur-sm h-64 flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                    <Skeleton className="h-5 w-2/3" />
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter className="pt-4 border-t border-border/50 bg-muted/20">
                  <div className="w-full flex items-center justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : watchlists.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {watchlists.map((item) => {
                  const ws = item.website;
                  if (!ws) return null;
                  const isDeleting = deletingId === item.id;
                  
                  let hostname = "";
                  try {
                    hostname = new URL(ws.url).hostname;
                  } catch (e) {
                    hostname = ws.url;
                  }

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="h-full"
                    >
                      <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/60 backdrop-blur-sm flex flex-col h-full overflow-hidden justify-between">
                        <CardHeader className="pb-3 flex-none">
                          <div className="flex items-start justify-between gap-2">
                            <Link href={`/websites/${ws.slug}`} className="flex items-center gap-3 flex-1 min-w-0">
                              {ws.iconUrl ? (
                                <img
                                  src={ws.iconUrl}
                                  alt=""
                                  className="w-8 h-8 rounded-lg object-cover bg-muted border border-border/50 shrink-0"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                  <Globe className="w-4 h-4 text-primary" />
                                </div>
                              )}
                              <CardTitle
                                className="text-base font-bold line-clamp-1 group-hover:text-primary transition-colors leading-tight"
                                title={ws.title || ws.slug}
                              >
                                {ws.title || ws.slug}
                              </CardTitle>
                            </Link>

                            <Button
                              variant="ghost"
                              size="icon-xs"
                              disabled={isDeleting}
                              onClick={() => handleUnwatchlist(item.id, ws.title || ws.slug)}
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 transition-colors"
                              title="Remove from Watchlist"
                            >
                              {isDeleting ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <BookmarkX className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent className="pb-4 flex-grow relative">
                          <Link href={`/websites/${ws.slug}`} className="absolute inset-0 z-0" />
                          <div className="relative z-10 pointer-events-none">
                            {ws.description ? (
                              <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                                {ws.description}
                              </CardDescription>
                            ) : (
                              <CardDescription className="italic opacity-50 text-xs">
                                No description provided.
                              </CardDescription>
                            )}
                          </div>
                        </CardContent>

                        <CardFooter className="pt-4 border-t border-border/50 bg-muted/20 mt-auto">
                          <div className="w-full flex items-center justify-between text-xs font-medium text-muted-foreground">
                            <span className="truncate max-w-[120px]">{hostname}</span>
                            <div className="flex items-center gap-2">
                              <ShareButton url={ws.url} title={ws.title} />
                              <CopyButton url={ws.url} />
                              <a
                                href={ws.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors flex items-center justify-center p-1"
                                title="Visit Website"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => p - 1);
                    fetchWatchlist(page - 1, searchTitle);
                  }}
                >
                  Previous
                </Button>
                <div className="flex items-center px-4 text-sm font-medium text-muted-foreground">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => {
                    setPage((p) => p + 1);
                    fetchWatchlist(page + 1, searchTitle);
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-2xl border-border bg-card/25 backdrop-blur-sm max-w-xl mx-auto h-72">
            <FolderHeart className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold text-foreground">Your watchlist is empty</h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm">
              Explore essential developer resources and tools, and save your favorites to view them here.
            </p>
            <Link href="/websites" className="mt-6">
              <Button size="sm" className="rounded-lg px-6 font-medium">
                Browse Websites
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
