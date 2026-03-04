import { DashboardStatsType } from "@/types/Dashboard";
import StatCard from "../team/user/StatCard";
import { ArrowUpRight, ShieldCheck, User, Users } from "lucide-react";

export function UserCards({ stats }: { stats: DashboardStatsType }) {
  return (
    <div className="xl:col-span-1 space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 px-1">Identity & Access</h3>
      <div className="grid grid-cols-1 gap-3">
        <StatCard icon={<Users className="w-4 h-4 text-blue-400" />} label="Total Registered Users">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{stats?.users || "-"}</span>
            <span className="text-[10px] text-blue-400 flex items-center bg-blue-400/10 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-2 h-2 mr-0.5" /> {stats?.newUsersThisWeek || "-"}
            </span>
          </div>
        </StatCard>
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<User className="w-4 h-4 text-green-400" />} label="Agents">
            <span className="text-xl font-semibold text-white">{stats?.agents || "-"}</span>
          </StatCard>
          <StatCard icon={<ShieldCheck className="w-4 h-4 text-purple-400" />} label="Admins">
            <span className="text-xl font-semibold text-white">{stats?.admins || "-"}</span>
          </StatCard>
        </div>
      </div>
    </div>
  )
}
