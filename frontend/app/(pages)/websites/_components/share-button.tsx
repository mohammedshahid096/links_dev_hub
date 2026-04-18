"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export function ShareButton({ url, title, className }: { url: string, title?: string, className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator.share) {
        await navigator.share({
          title: title || "Check out this website",
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      title="Share Website"
      className={`hover:text-primary transition-colors flex items-center justify-center p-1 rounded-md ${className || ''}`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
    </button>
  );
}
