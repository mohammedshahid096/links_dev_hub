import { getPublicCategories } from "@/_api/category/public.category";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/home/footer";
import { CategoryCard } from "./_components/category-card";
import { CategoriesEmptyState } from "./_components/categories-empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Categories",
  description:
    "Explore all developer resource categories on Links Dev Hub. Find curated collections of tools, frameworks, libraries, and more organized by topic.",
  keywords: ["developer categories", "dev tools", "programming resources", "tech categories", "developer catalog"],
  openGraph: {
    title: "Browse Categories — Links Dev Hub",
    description:
      "Explore all developer resource categories. Find curated collections organized by topic.",
    url: "https://devhub.app/categories",
  },
};

export default async function CategoriesPage() {
  let categories: any[] = [];
  let error = null;

  try {
    const categoriesResponse = await getPublicCategories();

    if (!categoriesResponse.success) {
      error = categoriesResponse.data?.message || "Failed to fetch categories";
    } else {
      categories = categoriesResponse.data?.data || [];
    }
  } catch (err) {
    error = "Failed to connect to the server";
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-50" />
      <Header />
      <main className="container mx-auto px-4 py-12 lg:py-20 animate-in fade-in duration-500 min-h-[80vh]">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Browse <span className="text-primary">Categories</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our curated categories to discover the best developer resources, tools, and frameworks organized by topic.
          </p>
        </div>

        {error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20 mb-8">
            {error}
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
              <p className="text-sm font-medium text-muted-foreground">
                Showing <span className="text-foreground">{categories.length}</span> {categories.length === 1 ? "category" : "categories"}
              </p>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category: any) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            ) : (
              <CategoriesEmptyState />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
