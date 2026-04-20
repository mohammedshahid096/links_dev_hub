"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
  Globe,
  Layers,
  Database,
  Github,
  Code2,
  Cpu,
  MonitorPlay,
  Star,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Node: icon + label with glow ring
   ───────────────────────────────────────────── */
interface NodeProps {
  className?: string;
  children?: React.ReactNode;
  label?: string;
  glow?: string; // tailwind shadow colour token (e.g. "shadow-indigo-500/40")
}

const Node = forwardRef<HTMLDivElement, NodeProps>(
  ({ className, children, label, glow }, ref) => (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-14 items-center justify-center rounded-2xl",
          "border border-border/60 bg-card/80 backdrop-blur-md shadow-lg",
          "transition-all duration-300 hover:-translate-y-1 hover:border-white/30",
          glow && `shadow-lg ${glow}`,
          className,
        )}
      >
        {children}
      </div>
      {label && (
        <span className="text-[10px] font-medium text-muted-foreground/70 tracking-wide select-none">
          {label}
        </span>
      )}
    </div>
  ),
);
Node.displayName = "Node";

/* ─────────────────────────────────────────────
   Hub: the central branded node
   ───────────────────────────────────────────── */
const Hub = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div className="flex flex-col items-center gap-3">
      {/* outer glow ring */}
      <div className="relative">
        <div className="absolute -inset-3 rounded-[28px] bg-primary/15 blur-xl animate-pulse" />
        <div
          ref={ref}
          className={cn(
            "relative z-10 flex size-20 items-center justify-center rounded-3xl",
            "border border-primary/60 bg-gradient-to-br from-primary/30 to-primary/10",
            "shadow-[0_0_40px_-8px] shadow-primary/60 backdrop-blur-md",
            "transition-all duration-300 hover:shadow-primary/80 hover:-translate-y-1",
            className,
          )}
        >
          <MonitorPlay className="w-9 h-9 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs font-semibold text-foreground/90 tracking-wide">
          DevHub
        </span>
        <span className="text-[10px] text-muted-foreground/60">Your watchlist</span>
      </div>
    </div>
  ),
);
Hub.displayName = "Hub";

/* ─────────────────────────────────────────────
   Stat pill shown at the bottom of the card
   ───────────────────────────────────────────── */
function StatPill({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-3 py-1.5 backdrop-blur-sm">
      <span className={cn("w-2 h-2 rounded-full", color)} />
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-[11px] font-semibold text-foreground">{value}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main export
   ───────────────────────────────────────────── */
export function HeroDecorativeUI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const githubRef   = useRef<HTMLDivElement>(null);
  const dbRef       = useRef<HTMLDivElement>(null);
  const webRef      = useRef<HTMLDivElement>(null);
  const hubRef      = useRef<HTMLDivElement>(null);
  const stackRef    = useRef<HTMLDivElement>(null);
  const codeRef     = useRef<HTMLDivElement>(null);
  const aiRef       = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-24 relative max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
      {/* fade-out overlay at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent z-20" />

      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-2xl shadow-2xl ring-1 ring-white/[0.08]"
      >
        {/* ── Browser chrome ── */}
        <div className="h-11 w-full border-b border-border/40 bg-muted/20 flex items-center px-4 gap-3 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80   shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80  shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          </div>
          <div className="h-6 flex-1 max-w-xs bg-background/40 rounded-md border border-border/40 flex items-center px-3 mx-auto">
            <Globe className="w-3 h-3 text-muted-foreground mr-2 shrink-0" />
            <span className="text-[11px] text-muted-foreground font-mono truncate">
              devhub.app/watchlist
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground/50">
            <Star className="w-3.5 h-3.5 fill-amber-400/60 text-amber-400/60" />
            <span className="text-[10px]">Saved</span>
          </div>
        </div>

        {/* ── Beam canvas ── */}
        <div className="flex w-full items-center justify-between px-10 md:px-20 py-14">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            <Node
              ref={githubRef}
              label="GitHub"
              glow="shadow-indigo-500/30"
              className="bg-gradient-to-br from-indigo-500/15 to-purple-500/10"
            >
              <Github className="w-6 h-6 text-indigo-400" />
            </Node>
            <Node
              ref={dbRef}
              label="Database"
              glow="shadow-emerald-500/30"
              className="bg-gradient-to-br from-emerald-500/15 to-teal-500/10"
            >
              <Database className="w-6 h-6 text-emerald-400" />
            </Node>
            <Node
              ref={webRef}
              label="Websites"
              glow="shadow-pink-500/30"
              className="bg-gradient-to-br from-pink-500/15 to-rose-500/10"
            >
              <Globe className="w-6 h-6 text-pink-400" />
            </Node>
          </div>

          {/* Centre hub */}
          <Hub ref={hubRef} />

          {/* Right column */}
          <div className="flex flex-col gap-10">
            <Node
              ref={stackRef}
              label="Stacks"
              glow="shadow-blue-500/30"
              className="bg-gradient-to-br from-blue-500/15 to-cyan-500/10"
            >
              <Layers className="w-6 h-6 text-blue-400" />
            </Node>
            <Node
              ref={codeRef}
              label="Snippets"
              glow="shadow-orange-500/30"
              className="bg-gradient-to-br from-orange-500/15 to-red-500/10 hidden md:flex"
            >
              <Code2 className="w-6 h-6 text-orange-400" />
            </Node>
            <Node
              ref={aiRef}
              label="AI Tools"
              glow="shadow-yellow-500/30"
              className="bg-gradient-to-br from-yellow-500/15 to-amber-500/10"
            >
              <Cpu className="w-6 h-6 text-yellow-400" />
            </Node>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 pb-7 px-4">
          <StatPill label="Sites tracked" value="1,240+"  color="bg-indigo-500"  />
          <StatPill label="Repos saved"   value="840+"    color="bg-emerald-500" />
          <StatPill label="Devs active"   value="3.2k"    color="bg-primary"     />
        </div>

        {/* ── Beams ── */}
        <AnimatedBeam containerRef={containerRef} fromRef={githubRef} toRef={hubRef}
          curvature={-60} endYOffset={-10} duration={4}
          gradientStartColor="#6366f1" gradientStopColor="#a855f7"
        />
        <AnimatedBeam containerRef={containerRef} fromRef={dbRef} toRef={hubRef}
          duration={5} delay={0.5}
          gradientStartColor="#10b981" gradientStopColor="#14b8a6"
        />
        <AnimatedBeam containerRef={containerRef} fromRef={webRef} toRef={hubRef}
          curvature={60} endYOffset={10} duration={4.5} delay={1}
          gradientStartColor="#ec4899" gradientStopColor="#f43f5e"
        />
        <AnimatedBeam containerRef={containerRef} fromRef={stackRef} toRef={hubRef}
          curvature={-60} endYOffset={-10} duration={4} reverse
          gradientStartColor="#3b82f6" gradientStopColor="#06b6d4"
        />
        <AnimatedBeam containerRef={containerRef} fromRef={codeRef} toRef={hubRef}
          duration={5} delay={0.8} reverse
          gradientStartColor="#f97316" gradientStopColor="#ef4444"
        />
        <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={hubRef}
          curvature={60} endYOffset={10} duration={4.5} delay={1.2} reverse
          gradientStartColor="#eab308" gradientStopColor="#f59e0b"
        />
      </div>
    </div>
  );
}
