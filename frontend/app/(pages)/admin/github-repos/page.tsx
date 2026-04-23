import { Github, Plus, ExternalLink, Globe, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { getAdminGithubRepos } from "@/api/github-repos/admin.github";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export const metadata = {
  title: "GitHub Repositories | Admin",
  description: "Manage GitHub repositories",
  robots: { index: false, follow: false },
};

export default async function GithubReposPage() {
  const { getToken } = await auth();
  const token = await getToken();

  let repos: any[] = [];
  let error: string | null = null;

  try {
    const { success, data } = await getAdminGithubRepos(token);
    if (success) {
      repos = data?.data || [];
    } else {
      error = data?.message || "Failed to fetch repositories";
    }
  } catch (err) {
    error = "Server connection error";
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Github className="w-7 h-7 text-primary" />
            GitHub Repositories
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage GitHub repositories linked to your platform
          </p>
        </div>

        <Link href="/admin/github-repos/add">
          <Button className="flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            Add Repository
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-4 rounded-lg mb-8 border border-rose-200 dark:border-rose-500/20">
          {error}
        </div>
      )}

      {repos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {repos.map((repo) => (
            <Card key={repo.id} className="group hover:shadow-md transition-all duration-300 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold flex items-center gap-2 line-clamp-1">
                   <Github className="w-4 h-4 text-muted-foreground" />
                   <span className="truncate">{repo.repoName || "Repository"}</span>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs min-h-[2.5rem]">
                   {repo.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-3">
                   <a 
                    href={repo.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline w-fit"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[180px]">{repo.repoUrl}</span>
                  </a>

                  {repo.website && (
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full w-fit border border-emerald-100 dark:border-emerald-500/20">
                      <Globe className="w-3 h-3" />
                      <span className="font-medium">Linked to: {repo.website.title}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/5 flex justify-end gap-2">
                 <Button variant="ghost" size="sm" className="h-8 px-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Delete
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        !error && (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed rounded-2xl border-border/60 bg-muted/5">
            <div className="p-4 bg-muted/10 rounded-full mb-4">
              <Github className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              No repositories yet
            </h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6 max-w-sm">
              Linked GitHub repositories will appear here. Add one by link to get started.
            </p>
            <Link href="/admin/github-repos/add">
              <Button variant="default" className="px-8">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Repo
              </Button>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
