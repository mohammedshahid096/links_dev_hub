"use client";

import { SignUp } from "@clerk/nextjs";
import { Link2, CheckCircle2, Zap, Layout, Globe } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-zinc-950 p-4 lg:p-8">
      <div className="grid w-full max-w-[1200px] min-h-[700px] md:grid-cols-2 shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        {/* LEFT SIDE - The "Vibe" Side */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-zinc-900 overflow-hidden">
          {/* Abstract Background Decoration */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Link2 className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                LinkVault
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-semibold text-white leading-[1.1] tracking-tight">
              Control your <br />
              <span className="text-zinc-500">digital chaos.</span>
            </h2>
            <p className="mt-6 text-zinc-400 text-lg max-w-sm leading-relaxed">
              The modern way to bookmark, organize, and share your favorite
              corners of the internet.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            {[
              { icon: <Zap className="w-4 h-4" />, text: "Quick Save" },
              { icon: <Layout className="w-4 h-4" />, text: "Clean UI" },
              { icon: <Globe className="w-4 h-4" />, text: "Sync Everywhere" },
              {
                icon: <CheckCircle2 className="w-4 h-4" />,
                text: "Smart Tags",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 backdrop-blur-sm"
              >
                {feature.icon}
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - The Action Side */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-12 relative">
          <div className="w-full max-w-[400px] space-y-8">
            <div className="text-center md:hidden mb-8">
              <h1 className="text-3xl font-bold">LinkVault</h1>
              <p className="text-muted-foreground mt-2">
                Sign up to start saving links
              </p>
            </div>

            <SignUp
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-none bg-transparent p-0 w-full",
                  headerTitle:
                    "text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100",
                  headerSubtitle: "text-zinc-500 dark:text-zinc-400",
                  formButtonPrimary:
                    "bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-sm normal-case",
                  socialButtonsBlockButton:
                    "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium transition-all",
                  footerActionLink:
                    "text-primary hover:text-primary/90 font-semibold",
                  formFieldLabel:
                    "text-zinc-700 dark:text-zinc-300 font-medium",
                  formFieldInput:
                    "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
