import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Folder,
  Calendar,
  Tag,
  CheckCircle2,
  XCircle,
  Plus,
  Edit2,
} from "lucide-react";
import { getAdminCategories } from "@/api/category/admin.category";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/admin/category.type";

export default async function CategoriesPage() {
  const { getToken } = await auth();
  const token = await getToken();

  let categories: Category[] = [];
  let error = null;

  try {
    const { success, data } = await getAdminCategories(token);
    if (!success) {
      error = data?.message || "Failed to fetch categories";
    } else {
      categories = data.data || [];
    }
  } catch (err) {
    error = "Failed to connect to the server";
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6 md:gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Categories
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your categories across the platform
          </p>
        </div>
        <div className="w-full md:w-auto">
          <Link href="/admin/category/add">
            <Button className="w-full md:w-auto flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-lg mb-8 border border-red-200 dark:border-red-500/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories?.map((category: Category) => (
          <Card
            key={category.id}
            className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col h-full bg-card"
          >
            {/* Top color bar depending on status */}
            <div
              className={`absolute top-0 left-0 w-full h-1 transition-colors ${category?.isActive ? "bg-emerald-500" : "bg-rose-500"}`}
            ></div>

            <CardHeader className="pb-2 flex-none">
              <div className="flex items-start justify-between w-full">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  {category?.icon ? (
                    <span>{category?.icon}</span>
                  ) : (
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Folder className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  {category?.name}
                </CardTitle>

                {/* Status Badge */}
                {category?.isActive ? (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-100/80 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 text-xs font-semibold">
                    <XCircle className="w-3 h-3" />
                    Inactive
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="pb-4 pt-2 flex-grow">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="w-4 h-4 opacity-70" />
                  <span className="font-medium bg-muted px-2 py-0.5 rounded-md text-xs">
                    {category?.slug}
                  </span>
                </div>
                {category?.description ? (
                  <CardDescription className="line-clamp-2 font-medium">
                    {category?.description}
                  </CardDescription>
                ) : (
                  <CardDescription className="italic opacity-70">
                    No description provided.
                  </CardDescription>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t text-xs text-muted-foreground flex flex-none items-center justify-between bg-muted/20">
              <div className="flex items-center gap-1.5" title="Created At">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(category?.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <Link href={`/admin/category/edit/${category?.slug}`}>
                <Button
                  variant="ghost"
                  size="xs"
                  className="h-7 px-2 text-primary hover:bg-primary/10"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {!error && categories?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl border-border bg-muted/5">
          <Folder className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground">
            No categories found
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            There are no categories available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
