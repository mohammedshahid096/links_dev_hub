import type { Metadata } from "next";
import { Construction, Sparkles, Clock, Rocket, GitBranch, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | Admin Dashboard",
  description: "Admin dashboard — coming soon.",
};

const features = [
  {
    icon: Star,
    label: "Watchlist Overview",
    description: "Quick summary of all your saved websites and repos.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: GitBranch,
    label: "GitHub Repos",
    description: "Track and manage your saved GitHub repositories.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Rocket,
    label: "Activity Feed",
    description: "See your recent saves, removals, and browsing activity.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-16 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8 animate-in fade-in duration-500">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase">Under Development</span>
        </div>

        {/* Icon */}
        <div className="relative mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-xl" />
          <div className="relative w-24 h-24 rounded-3xl bg-card border border-border/60 flex items-center justify-center shadow-2xl">
            <Construction className="w-12 h-12 text-primary" />
          </div>
          {/* Sparkle decorations */}
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 animate-pulse" />
          <Clock className="absolute -bottom-2 -left-2 w-4 h-4 text-muted-foreground/50" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Dashboard{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-500">
            Coming Soon
          </span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          We're working hard to bring you a beautiful, personalised dashboard. 
          In the meantime, explore your watchlist from the sidebar.
        </p>

        {/* Upcoming features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${feature.bg} backdrop-blur-sm text-center`}
            >
              <div className={`p-2.5 rounded-xl bg-card/60 border border-border/40`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar hint */}
        <div className="mt-12 w-full max-w-xs animate-in fade-in duration-700 delay-500">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Development progress</span>
            <span className="font-semibold text-primary">35%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500 animate-pulse"
              style={{ width: "35%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
