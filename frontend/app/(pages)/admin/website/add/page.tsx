import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAdminCategories } from "@/api/category/admin.category";
import { auth } from "@clerk/nextjs/server";
import { AddWebsiteForm } from "../_components/AddWebsiteForm";

export default async function AddWebsitePage() {
  const { getToken } = await auth();
  const token = await getToken();

  let categories = [];
  let error = null;

  try {
    const { success, data } = await getAdminCategories(token);
    if (success) {
      categories = data?.data || [];
    } else {
      error = "Failed to load categories";
    }
  } catch (err) {
    error = "Server connection error fetching categories";
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl animate-in fade-in duration-500 pb-20">
      <Link
        href="/admin/website"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Websites
      </Link>

      {error ? (
        <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-4 rounded-lg mb-8 border border-rose-200 dark:border-rose-500/20">
          <p className="font-semibold mb-1">Warning</p>
          <p className="text-sm">
            {error}. You will not be able to select a category.
          </p>
        </div>
      ) : null}

      <AddWebsiteForm categories={categories} />
    </div>
  );
}
