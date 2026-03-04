"use client";

import { DetailedList } from "@/components/dashboard/DetailedList";
import { TicketCards } from "@/components/dashboard/TicketCards";
import { UserCards } from "@/components/dashboard/UserCards";
import { fetchDashboardStats } from "@/lib/api/dashboard.api";
import { DashboardStatsType } from "@/types/Dashboard";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardSection() {
  const [stats, setStats] = useState<DashboardStatsType | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadDashboardStats() {
      const dashboardStatsResponse = await fetchDashboardStats();
      if (dashboardStatsResponse) {
        setStats(dashboardStatsResponse);
      }
      setLoading(false);
    }
    loadDashboardStats();
  }, []);

  if (loading) return <p>Loading...</p>

  return (
    <>
      <div className="flex sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Overview</h2>
          <p className="text-sm text-white/40 mt-1">Real-time performance and user distribution</p>
        </div>
        <div className="flex items-center w-max gap-2 text-xs font-medium bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-md border border-emerald-500/20 animate-pulse">
          <Activity className="w-3 h-3" />
          System Live
        </div>
      </div>

      {
        (!loading && stats) &&
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <UserCards stats={stats} />
            <TicketCards stats={stats} />
          </div>
          <DetailedList stats={stats} />
        </>
      }
    </>
  )
}