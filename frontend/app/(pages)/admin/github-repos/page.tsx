import { Github, Plus, ExternalLink, Globe, Trash2, Code2, Tag } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

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
            <Card key={repo.id} className="group hover:shadow-md transition-all duration-300 border-border/50 flex flex-col h-full bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-bold flex items-start gap-2 line-clamp-2 leading-snug">
                    <Github className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span title={repo.repoName}>{repo.repoName}</span>
                  </CardTitle>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${repo.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                    {repo.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
                <CardDescription className="line-clamp-4 text-xs mt-2 leading-relaxed">
                   {repo.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4 flex-grow space-y-4">
                <div className="space-y-2.5">
                   <a 
                    href={repo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline w-fit"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[180px] font-medium">{repo.username}/{repo.repoName}</span>
                  </a>

                  <div className="flex flex-wrap gap-1.5">
                    {repo.language && (
                      <div className="flex items-center gap-1 text-[10px] bg-muted/50 px-2 py-0.5 rounded-sm text-muted-foreground border border-border/50">
                        <Code2 className="w-3 h-3" />
                        {repo.language}
                      </div>
                    )}
                    {repo.websiteId && (
                      <div className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-0.5 rounded-sm border border-emerald-100 dark:border-emerald-500/20">
                        <Globe className="w-3 h-3" />
                        Linked
                      </div>
                    )}
                  </div>
                </div>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic: string) => (
                      <Badge key={topic} variant="outline" className="text-[10px] px-1.5 py-0 font-normal h-5 border-border/40">
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="text-[10px] text-muted-foreground/60 self-center">+{repo.topics.length - 3}</span>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-3 border-t bg-muted/5 flex justify-between items-center h-12">
                 <span className="text-[10px] text-muted-foreground">
                    {repo.username}
                 </span>
                 <Button variant="ghost" size="xs" className="h-7 px-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10">
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
              <Button variant="default" className="px-8 shadow-sm">
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
