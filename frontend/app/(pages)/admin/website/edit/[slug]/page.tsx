import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAdminCategories } from "@/api/category/admin.category";
import { getAdminWebsiteBySlug } from "@/api/website/admin.website";
import { auth } from "@clerk/nextjs/server";
import { UpdateWebsiteForm } from "../../_components/UpdateWebsiteForm";

export default async function EditWebsitePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { getToken } = await auth();
  const token = await getToken();

  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  let categories = [];
  let websiteData = null;
  let error = null;

  try {
    const [categoriesResponse, websiteResponse] = await Promise.all([
      getAdminCategories(token),
      getAdminWebsiteBySlug(slug, token)
    ]);

    if (categoriesResponse.success) {
      categories = categoriesResponse.data?.data || [];
    } else {
      error = "Failed to load categories";
    }

    if (websiteResponse.success && websiteResponse.data?.data) {
      websiteData = websiteResponse.data.data;
    } else {
      error = "Failed to load website details";
    }
  } catch (err) {
    error = "Server connection error";
  }


  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl animate-in fade-in duration-500 pb-20">
      <Link href="/admin/website" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Websites
      </Link>

      {error ? (
        <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-4 rounded-lg mb-8 border border-rose-200 dark:border-rose-500/20">
          <p className="font-semibold mb-1">Warning</p>
          <p className="text-sm">{error}. Please try again later.</p>
        </div>
      ) : null}

      {!error && websiteData ? (
        <UpdateWebsiteForm initialData={websiteData} categories={categories} />
      ) : (
        !error && (
          <div className="p-8 text-center text-muted-foreground border rounded-lg bg-card">
            <h2 className="text-lg font-semibold mb-2 text-foreground">Loading...</h2>
            <p className="text-sm">Please wait while we load the website details.</p>
          </div>
        )
      )}
    </div>
  );
}
