import DashboardSection from "@/components/dashboard/DashboardSection";

export default function Dashboard() {
  return (
    <div>
      <div className="h-12" />
      <section className="w-full min-h-187.5 bg-main-secondary rounded-lg mt-9 border border-white/10 p-6 space-y-8">
      <DashboardSection />
      </section>
    </div>
  );
}
