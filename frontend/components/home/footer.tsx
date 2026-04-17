import { Github, Twitter, Layers, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-24">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">Links Dev Hub</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              The ultimate developer watchlist. Discover, save, and organize your favorite tools, 
              websites, and repositories in one beautiful place. Built by developers, for developers.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-foreground transition-colors">Explore Sites</Link></li>
              <li><Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link href="/watchlist" className="hover:text-foreground transition-colors">Watchlist</Link></li>
              <li><Link href="/admin/website" className="hover:text-foreground transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <ExternalLink className="w-4 h-4" /> Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Links Dev Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
