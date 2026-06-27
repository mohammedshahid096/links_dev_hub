"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getAdminCategoryBySlug,
  updateAdminCategory,
  deleteAdminCategory,
} from "@/api/category/admin.category";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
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
import Link from "next/link";

export default function EditCategoryPage() {
  const { slug } = useParams() as { slug: string };

  const [categoryId, setCategoryId] = useState<string | number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = await getToken();
        const { success, data } = await getAdminCategoryBySlug(slug, token);

        if (success && data?.data) {
          setCategoryId(data.data.id);
          setName(data.data.name || "");
          setDescription(data.data.description || "");
          setIsActive(data.data.isActive ?? true);
        } else {
          setError("Category not found or failed to load");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load category data");
      } finally {
        setFetching(false);
      }
    };

    if (slug) fetchCategory();
  }, [slug, getToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) return;

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const { success, data } = await updateAdminCategory(
        categoryId,
        {
          name: name.trim(),
          description: description.trim() || undefined,
          isActive,
        },
        token,
      );

      if (success) {
        router.push("/admin/category");
        router.refresh();
      } else {
        setError(data?.message || "Failed to update category");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!categoryId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    setDeleting(true);
    setError(null);

    try {
      const token = await getToken();
      const { success, data } = await deleteAdminCategory(categoryId, token);

      if (success) {
        router.push("/admin/category");
        router.refresh();
      } else {
        setError(data?.message || "Failed to delete category");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setDeleting(false);
    }
  };

  if (fetching) {
    return (
      <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">
          Loading category details...
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl animate-in fade-in duration-500">
      <Link
        href="/admin/category"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Categories
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Category</CardTitle>
          <CardDescription>
            Update your category details or remove it
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-3 rounded-md text-sm border border-rose-200 dark:border-rose-500/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Category Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Frontend Development"
                disabled={loading || deleting}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a short description for this category"
                disabled={loading || deleting}
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between border rounded-md p-4 bg-muted/20">
              <div className="space-y-0.5">
                <label className="text-sm font-medium leading-none">
                  Active Status
                </label>
                <p className="text-sm text-muted-foreground">
                  Determine if this category is visible to users
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  disabled={loading || deleting}
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"></div>
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t mt-4 bg-muted/10">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={loading || deleting || !categoryId}
              className="w-full sm:w-auto"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              {deleting ? "Deleting..." : "Delete Category"}
            </Button>

            <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/category")}
                disabled={loading || deleting}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || deleting || !name.trim() || !categoryId}
                className="w-full sm:w-auto min-w-[140px]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {loading ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
