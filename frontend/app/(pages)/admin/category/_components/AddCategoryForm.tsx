"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminCategory } from "@/api/category/admin.category";
import { Plus, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export function AddCategoryForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const { success, data } = await createAdminCategory({ name: name.trim() }, token);
      if (success) {
        setName("");
        router.refresh(); // Refresh the page to show the new category
      } else {
        setError(data?.message || "Failed to create category");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex-grow w-full sm:w-auto relative mb-6 sm:mb-0">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Category Name (e.g. css)"
          disabled={loading}
          className="w-full px-4 py-2 border border-border bg-background rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50 text-sm"
        />
        {error && <p className="absolute -bottom-5 left-1 text-xs text-rose-500 font-medium">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        Add Category
      </button>
    </form>
  );
}
