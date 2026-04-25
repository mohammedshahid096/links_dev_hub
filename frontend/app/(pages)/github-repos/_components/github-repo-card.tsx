import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, ExternalLink, Star, Code2, GitFork } from "lucide-react";
import { GithubRepo } from "@/types/admin/github-repo.type";

export function GithubRepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/60 backdrop-blur-sm flex flex-col h-full overflow-hidden">
      <CardHeader className="pb-3 flex-none">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Github className="w-4 h-4 text-primary" />
            </div>
            <CardTitle 
              className="text-base font-bold line-clamp-1 group-hover:text-primary transition-colors pr-2"
              title={repo.repoName}
            >
              {repo.repoName}
            </CardTitle>
          </div>
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${repo.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
            {repo.isActive ? "Active" : "Inactive"}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow relative">
        <CardDescription className="line-clamp-3 text-sm leading-relaxed mb-4">
          {repo.description || "No description provided."}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2">
          {repo.language && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground border border-border/50">
              <Code2 className="w-2.5 h-2.5" />
              {repo.language}
            </span>
          )}
          {repo.topics?.slice(0, 3).map((topic: string) => (
            <span key={topic} className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              #{topic}
            </span>
          ))}
          {repo.topics?.length > 3 && (
            <span className="text-[10px] text-muted-foreground self-center">+{repo.topics.length - 3}</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-border/50 bg-muted/20 mt-auto">
        <div className="w-full flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span className="truncate max-w-[120px] font-medium">{repo.username}</span>
          <div className="flex items-center gap-3">
             {/* Note: In a real app we'd fetch star/fork count from GH API or have it in our DB */}
            <a 
              href={repo.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
              title="View on GitHub"
            >
              <span className="hidden sm:inline">View Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
