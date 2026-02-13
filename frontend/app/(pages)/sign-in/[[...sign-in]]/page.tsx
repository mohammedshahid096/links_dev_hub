"use client";

import { SignIn } from "@clerk/nextjs";
import { Link2, Sparkles, ShieldCheck, ArrowRight, Zap } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-zinc-950 p-4 lg:p-8">
      <div className="grid w-full max-w-[1200px] min-h-[700px] md:grid-cols-2 shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        {/* LEFT SIDE - The "Welcome Back" Side */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-zinc-900 overflow-hidden">
          {/* Subtle Glow Effects */}
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-primary/15 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12 group cursor-pointer">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                <Link2 className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                LinkVault
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-semibold text-white leading-[1.1] tracking-tight">
              Welcome back to <br />
              <span className="text-zinc-500 italic">your library.</span>
            </h2>
            <p className="mt-6 text-zinc-400 text-lg max-w-sm leading-relaxed">
              Log in to access your saved links, collections, and shared vaults
              from any device.
            </p>
          </div>

          {/* Social Proof / Trust Indicators */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-zinc-300 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-sm">
                Your data is encrypted and private.
              </span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-sm">
                New: AI-powered link categorization is live!
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - The Login Form */}
        <div className="flex flex-col items-center justify-center p-8 lg:p-12 relative">
          <div className="w-full max-w-[400px] space-y-8">
            <div className="text-center md:hidden mb-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-4">
                <Link2 className="text-white w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
            </div>

            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-none bg-transparent p-0 w-full",
                  headerTitle:
                    "text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100",
                  headerSubtitle: "text-zinc-500 dark:text-zinc-400",
                  formButtonPrimary:
                    "bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-sm normal-case py-2.5",
                  socialButtonsBlockButton:
                    "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium transition-all py-2.5",
                  footerActionLink:
                    "text-primary hover:text-primary/90 font-semibold",
                  dividerLine: "bg-zinc-100 dark:bg-zinc-800",
                  dividerText:
                    "text-zinc-400 text-xs uppercase tracking-widest",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
