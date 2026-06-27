"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { addWatchlistApi } from "@/_api/user/watchlist";

// ── Toast ───────────────────────────────────────────────────────────────────
function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error" | "info";
}) {
  const colors = {
    success: "border-green-500/30 bg-green-500/10 text-green-400",
    error: "border-destructive/30 bg-destructive/10 text-destructive",
    info: "border-primary/30 bg-primary/10 text-primary",
  };

  const icons = {
    success: <BookmarkCheck className="w-4 h-4 shrink-0" />,
    error: (
      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: <Bookmark className="w-4 h-4 shrink-0" />,
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300 ${colors[type]}`}
    >
      {icons[type]}
      <span className="text-sm font-medium whitespace-nowrap">{message}</span>
    </div>
  );
}

// ── WatchlistButton ──────────────────────────────────────────────────────────
interface WatchlistButtonProps {
  websiteId: string;
  websiteTitle?: string;
  className?: string;
}

export function WatchlistButton({
  websiteId,
  websiteTitle,
  className = "",
}: WatchlistButtonProps) {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ show: false, message: "", type: "success" });

  // Don't render at all if user is not signed in
  if (!isLoaded || !isSignedIn) return null;

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3500);
  };

  const handleWatchlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading || saved) return;

    setLoading(true);
    try {
      const token = await getToken();
      const response = await addWatchlistApi(websiteId, token);

      if (response.success) {
        setSaved(true);
        showToast(
          `"${websiteTitle || "Website"}" added to your watchlist!`,
          "success"
        );
      } else {
        // 409 Conflict = already watchlisted
        const status = response.status ?? 0;
        if (status === 409) {
          showToast("Already in your watchlist", "info");
        } else {
          showToast(
            response.data?.message || "Failed to add to watchlist",
            "error"
          );
        }
      }
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast.show && <Toast message={toast.message} type={toast.type} />}
      <button
        onClick={handleWatchlist}
        disabled={loading}
        title={saved ? "Saved to Watchlist" : "Add to Watchlist"}
        className={`hover:text-primary transition-all flex items-center justify-center p-1 rounded-md disabled:opacity-60 ${
          saved
            ? "text-primary"
            : "text-muted-foreground hover:text-primary"
        } ${className}`}
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : saved ? (
          <BookmarkCheck className="w-3.5 h-3.5" />
        ) : (
          <Bookmark className="w-3.5 h-3.5" />
        )}
      </button>
    </>
  );
}
