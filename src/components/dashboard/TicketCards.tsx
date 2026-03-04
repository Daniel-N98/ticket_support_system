import { Calendar, Check, Clock, Ticket } from "lucide-react";
import StatCard from "../team/user/StatCard";
import { DashboardStatsType } from "@/types/Dashboard";

export function TicketCards({ stats }: { stats: DashboardStatsType }) {
  const colors = { green: "text-green-400 border-green-400/30", orange: "text-orange-400 border-orange-400/30", red: "text-red-400 border-red-400/30" }
  const resolutionRate = Math.round((stats.tickets.closed / stats.tickets.total) * 100);
  const responseTime: number = stats.avgResponseTimeMinutes;

  const getColor = (type: string) => {
    return type === "resolution" ? (resolutionRate > 50 ? colors.green : resolutionRate > 25 ? colors.orange : colors.red) :
     (responseTime < 600 ? colors.green : responseTime < 1200 ? colors.orange : colors.red)
  }

  const formattedResponseTime = () => {
    if (responseTime <= 0) return "< 1 hr";

    const hours = Math.ceil(responseTime / 60);
    return hours === 1 ? "< 1 hr" : `< ${hours} hr${hours > 1 ? "s" : ""}`;
  };

  return (
    <div className="xl:col-span-2 space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 px-1">Support Pipeline</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={<Ticket className="w-4 h-4 text-orange-400" />} label="Total Tickets">
          <span className="text-xl font-bold text-white">{stats.tickets.total}</span>
        </StatCard>
        <StatCard icon={<div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />} label="Open Cases">
          <span className="text-xl font-bold text-yellow-400">{stats.tickets.open}</span>
        </StatCard>
        <StatCard icon={<div className="w-1.5 h-1.5 rounded-full bg-red-400" />} label="Pending">
          <span className="text-xl font-bold text-red-400">{stats.tickets.pending}</span>
        </StatCard>
        <StatCard icon={<div className="w-1.5 h-1.5 rounded-full bg-green-400" />} label="Resolved">
          <span className="text-xl font-bold text-green-400">{stats.tickets.closed}</span>
        </StatCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 ">
        <div className={`bg-black/20 rounded-lg p-4 border flex flex-col justify-center ${getColor("response")}`}>
          <p className="text-[10px] text-white/40 uppercase font-medium">Avg Response</p>
          <p className={`text-lg font-bold mt-1 flex items-center gap-2`}>
            <Clock className="w-4 h-4 text-cyan-400" /> {formattedResponseTime()}
          </p>
        </div>
        <div className={`bg-black/20 rounded-lg p-4 border flex flex-col justify-center ${getColor("resolution")}`}>
          <p className="text-[10px] text-white/40 uppercase font-medium">Resolution Rate</p>
          <p className={`text-lg font-bold mt-1 flex items-center gap-2`}>
            <Check className="w-4 h-4 text-green-400" />{resolutionRate}%
          </p>
        </div>
        <div className="bg-black/20 rounded-lg p-4 border border-white/10 flex flex-col justify-center">
          <p className="text-[10px] text-white/40 uppercase font-medium">Today&apos;s Load</p>
          <p className="text-lg font-bold text-white mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" /> {stats.tickets.today}
          </p>
        </div>
      </div>
    </div>
  )
}