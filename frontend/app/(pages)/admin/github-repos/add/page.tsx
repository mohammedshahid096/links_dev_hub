import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getAllWebsiteTitles } from "@/api/website/admin.website";
import { AddGithubRepoForm } from "./_components/AddGithubRepoForm";

export const metadata = {
  title: "Add GitHub Repository | Admin",
  description: "Add a new GitHub repository by URL link",
  robots: { index: false, follow: false },
};

export default async function AddGithubRepoPage() {
  const { getToken } = await auth();
  const token = await getToken();

  let websiteTitles: { id: string; title: string }[] = [];
  let websiteFetchError: string | null = null;

  try {
    const { success, data } = await getAllWebsiteTitles(token);
    if (success) {
      websiteTitles = data?.data || [];
    } else {
      websiteFetchError = data?.message || "Failed to load websites";
    }
  } catch {
    websiteFetchError = "Server connection error fetching websites";
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl animate-in fade-in duration-500 pb-20">
      <Link
        href="/admin/github-repos"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to GitHub Repos
      </Link>

      <AddGithubRepoForm
        websiteTitles={websiteTitles}
        websiteFetchError={websiteFetchError}
      />
    </div>
  );
}
