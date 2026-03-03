import TicketsContent from "@/components/tickets/table/TicketsContent";
import TicketsHeader from "@/components/tickets/table/TicketsHeader";

export default function TicketsPage() {

  return (
    <div>
      <TicketsHeader />
      <section className="w-full min-h-187.5 bg-main-secondary mt-6 rounded-lg border border-white/10">
        <TicketsContent />
      </section>
    </div>
  )
}