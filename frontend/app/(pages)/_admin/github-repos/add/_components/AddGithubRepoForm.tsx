"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addGithubRepoByLink } from "@/api/github-repos/admin.github";
import { Loader2, Github, Plus, Link as LinkIcon, Globe } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface WebsiteTitle {
  id: string;
  title: string;
}

interface AddGithubRepoFormProps {
  websiteTitles: WebsiteTitle[];
  websiteFetchError?: string | null;
}

export function AddGithubRepoForm({
  websiteTitles = [],
  websiteFetchError,
}: AddGithubRepoFormProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [linkToWebsite, setLinkToWebsite] = useState(false);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoUrl.trim()) {
      setError("Please provide a valid GitHub repository URL.");
      return;
    }

    if (linkToWebsite && !selectedWebsiteId) {
      setError("Please select a website to link this repository to.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = await getToken();

      const payload: { repoUrl: string; id?: string } = {
        repoUrl: repoUrl.trim(),
      };

      if (linkToWebsite && selectedWebsiteId) {
        payload.id = selectedWebsiteId;
      }

      const { success: apiSuccess, data } = await addGithubRepoByLink(
        payload,
        token
      );

      if (apiSuccess) {
        setSuccess(data?.message || "GitHub repository added successfully!");
        setTimeout(() => {
          router.push("/admin/github-repos");
          router.refresh();
        }, 1200);
      } else {
        setError(
          data?.message || "Failed to add repository. It may already exist."
        );
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Github className="w-5 h-5 text-primary" />
          Add GitHub Repository
        </CardTitle>
        <CardDescription>
          Paste a GitHub repository URL. Our system will fetch and store its
          metadata automatically.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Error */}
          {error && (
            <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-3 rounded-md text-sm border border-rose-200 dark:border-rose-500/20">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-3 rounded-md text-sm border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2">
              <span className="text-base">✓</span>
              {success}
            </div>
          )}

          {/* Repo URL */}
          <div className="space-y-2">
            <label htmlFor="repoUrl" className="text-sm font-medium leading-none">
              GitHub Repository URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="repoUrl"
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repository"
                disabled={loading}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Example: https://github.com/freeCodeCamp/freeCodeCamp
            </p>
          </div>

          {/* Link to Website Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/10 rounded-md">
                  <LinkIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Link to a Website</p>
                  <p className="text-xs text-muted-foreground">
                    Associate this repository with an existing website entry
                  </p>
                </div>
              </div>
              {/* Toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={linkToWebsite}
                onClick={() => {
                  setLinkToWebsite((prev) => !prev);
                  setSelectedWebsiteId("");
                }}
                disabled={loading}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  linkToWebsite ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    linkToWebsite ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Website selector — shown only when toggle is ON */}
            {linkToWebsite && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {websiteFetchError ? (
                  <div className="bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 p-3 rounded-md text-sm border border-amber-200 dark:border-amber-500/20">
                    Could not load websites: {websiteFetchError}
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="websiteId"
                      className="text-sm font-medium leading-none flex items-center gap-1.5"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Select Website <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="websiteId"
                      value={selectedWebsiteId}
                      onChange={(e) => setSelectedWebsiteId(e.target.value)}
                      required={linkToWebsite}
                      disabled={loading || websiteTitles.length === 0}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled>
                        {websiteTitles.length === 0
                          ? "No websites available"
                          : "Select a website..."}
                      </option>
                      {websiteTitles.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.title}
                        </option>
                      ))}
                    </select>
                    {websiteTitles.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        No websites found. Add a website first.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t mt-4 bg-muted/10">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/github-repos")}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              loading ||
              !repoUrl.trim() ||
              (linkToWebsite && !selectedWebsiteId)
            }
            className="w-full sm:w-auto min-w-[180px]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {loading ? "Adding Repository..." : "Add Repository"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
