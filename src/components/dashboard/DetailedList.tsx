import { DashboardStatsType } from "@/types/Dashboard";
import InfoRow from "../team/user/InfoRow";
import { Card } from "../ui/card";

export function DetailedList({ stats }: { stats: DashboardStatsType}) {
  const agentCoverage = stats?.agents > 0 ? Math.round(stats?.users / stats?.agents) : 0;
  const successRate = Math.round((stats?.tickets?.closed / stats?.tickets?.total) * 100) || 0;
  const colors = { green: "text-green-400", orange: "text-orange-400", red: "text-red-400" }
  const getColor = (type: string) => {
    return type === "agent" ? (agentCoverage > 1 ? colors.green : agentCoverage === 1 ? colors.orange : colors.red) :
      (successRate > 50 ? colors.green : successRate > 25 ? colors.orange : colors.red)
  }

  return (
    <div className="pt-4">
      <Card className="bg-main-secondary overflow-hidden border-white/10">
        <div className="p-4 bg-white/2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Audit Breakdown</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 border border-white/10">
          <div className="p-2 border-b md:border-b-0 border-white/10 md:border-r bg-main-secondary">
            <InfoRow label="User Growth (7d)" value={`${stats?.newUsersThisWeek || "-"}`} />
            <InfoRow label="Agent Coverage" value={`${agentCoverage} agents per customer`} textColor={getColor("agent")} />
          </div>
          <div className="p-2 border-b md:border-b-0 border-white/10 md:border-r bg-main-secondary">
            <InfoRow label="Weekly Volume" value={`${stats?.tickets?.week || "-"}`} />
            <InfoRow label="Daily Average" value={`${Math.round(stats?.tickets?.week / 7) || "-"}`} />
          </div>
          <div className="p-2 bg-main-secondary">
            <InfoRow label="Success Rate" value={`${successRate}%`} textColor={getColor("success")} />
            <InfoRow label="System Health" value="Stable" textColor="text-green-400" />
          </div>
        </div>
      </Card>
    </div>
  )
}