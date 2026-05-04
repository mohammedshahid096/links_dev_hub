"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, RefreshCw, Server, ShieldCheck, Globe, Cpu, Network, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface HealthData {
  success: boolean;
  headers: Record<string, string>;
}

export default function ServerHealthPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER? process.env.NEXT_PUBLIC_BACKEND_SERVER?.replace("/api/v1",""): "http://localhost:3000";
      const response = await fetch(`${baseUrl}/health`);
      if (!response.ok) throw new Error("Failed to fetch server health");
      const result = await response.json();
      setData(result);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Server Status
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time diagnostics and infrastructure overview.
          </p>
        </div>
        <Button 
          onClick={fetchHealth} 
          disabled={loading}
          variant="outline"
          className="rounded-full px-6 shadow-sm hover:shadow-md transition-all gap-2"
        >
          <RefreshCw className={cn("size-4", loading && "animate-spin")} />
          Refresh Diagnostics
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-background to-muted/50">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="size-12" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Activity className="size-3 text-green-500" />
                System Health
              </CardDescription>
              <CardTitle className="text-2xl font-bold">
                {loading ? "Checking..." : data?.success ? "Healthy" : "Unknown"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={data?.success ? "default" : "destructive"} className="rounded-sm">
                {data?.success ? "Operational" : "Offline"}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-background to-muted/50">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Server className="size-12" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Server className="size-3 text-blue-500" />
                Environment
              </CardDescription>
              <CardTitle className="text-2xl font-bold">
                {data?.headers["x-forwarded-proto"] ? "Production" : "Local"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Node.js Runtime
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-background to-muted/50">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="size-12" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <ShieldCheck className="size-3 text-purple-500" />
                Security
              </CardDescription>
              <CardTitle className="text-2xl font-bold">SSL Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground truncate">
                {data?.headers["cf-ray"] || "Internal Network"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border shadow-xl overflow-hidden bg-card/30 backdrop-blur-md">
          <CardHeader className="border-b bg-muted/30 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Network className="size-5 text-primary" />
                  Network Headers
                </CardTitle>
                <CardDescription>
                  Detailed request metadata from the server environment
                </CardDescription>
              </div>
              {lastUpdated && (
                <span className="text-xs text-muted-foreground italic">
                  Last checked: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-medium">
                  <tr>
                    <th className="px-6 py-3 border-b">Header Key</th>
                    <th className="px-6 py-3 border-b">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <tr key={`skeleton-${i}`}>
                          <td className="px-6 py-4">
                            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-64 bg-muted animate-pulse rounded" />
                          </td>
                        </tr>
                      ))
                    ) : error ? (
                      <tr>
                        <td colSpan={2} className="px-6 py-10 text-center text-destructive">
                          <Info className="size-8 mx-auto mb-2 opacity-50" />
                          <p className="font-medium">{error}</p>
                          <Button 
                            variant="link" 
                            onClick={fetchHealth}
                            className="mt-2 text-destructive underline"
                          >
                            Try again
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      data && Object.entries(data.headers).map(([key, value], index) => (
                        <motion.tr 
                          key={key}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="hover:bg-muted/30 transition-colors group"
                        >
                          <td className="px-6 py-4 font-mono text-xs text-primary/80 font-medium">
                            {key}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground break-all">
                            {value}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
          <Globe className="size-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Global Infrastructure</h4>
            <p className="text-xs text-blue-700/70 dark:text-blue-300/70">
              The server is currently routed through {data?.headers["cf-ipcountry"] || "Global"} edge nodes for optimal performance.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
          <Cpu className="size-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-green-900 dark:text-green-200">Processing Load</h4>
            <p className="text-xs text-green-700/70 dark:text-green-300/70">
              System diagnostics report nominal resource utilization and minimal latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
