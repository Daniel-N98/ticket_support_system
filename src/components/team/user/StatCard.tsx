import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <Card className="bg-main-secondary border-white/10 hover:border-white/20 transition-colors">
      <CardContent className="p-5 flex items-center justify-between sm:flex-col sm:items-start gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg border border-white/5">
            {icon}
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/30 sm:hidden">
            {label}
          </span>
          <span className="hidden sm:block text-[10px] uppercase tracking-widest font-bold text-white/30">
            {label}
          </span>
        </div>
        <div className="flexshrink-0">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}