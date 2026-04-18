"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function CopyButton({ url, className }: { url: string, className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying to clipboard", err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      title="Copy Website URL"
      className={`hover:text-primary transition-colors flex items-center justify-center p-1 rounded-md ${className || ''}`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}
