import { getPublicGithubRepos } from "@/api/github-repos/public.github";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/home/footer";
import { Github, Globe } from "lucide-react";
import { GithubRepoCard } from "./_components/github-repo-card";
import { GithubFilters } from "./_components/github-filters";
import { GithubPagination } from "./_components/github-pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore GitHub Repositories",
  description: "Browse our curated collection of essential developer GitHub repositories, tools, and open-source projects.",
};

export default async function GithubReposPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ search?: string, page?: string, sortBy?: string, limit?: string }> 
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page || "1";
  const limit = resolvedParams.limit || "12";
  const search = resolvedParams.search || "";
  const sortBy = resolvedParams.sortBy || "desc";

  let reposData: any = null;
  let error = null;
  
  try {
    const response = await getPublicGithubRepos({ page, limit, search, sortBy });
    
    if (!response.success) {
      error = response.data?.message || "Failed to fetch repositories";
    } else {
      reposData = response.data.data; 
    }
  } catch (err) {
    error = "Failed to connect to the server";
  }

  const repos = reposData?.repos || [];
  const currentPage = parseInt(page as string) || 1;
  const totalPages = reposData?.totalPages || 1;
  const totalCount = reposData?.totalCount || 0;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <Header />
      <main className="container mx-auto px-4 py-12 lg:py-20 animate-in fade-in duration-500 min-h-[80vh]">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            GitHub <span className="text-primary">Repositories</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore curated open-source projects, tools, and developer libraries.
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
                <GithubFilters />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Showing <span className="text-foreground">{repos.length}</span> of <span className="text-foreground">{totalCount}</span> repositories
                </p>
              </div>

              {repos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {repos.map((repo: any) => (
                    <GithubRepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl border-border bg-muted/10 h-64">
                  <Github className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-bold text-foreground">No repositories found</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">
                    We couldn't find any repositories matching your current filters.
                  </p>
                </div>
              )}

              <GithubPagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
