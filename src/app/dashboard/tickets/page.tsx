import TicketsContent from "@/components/tickets/TicketsContent";
import TicketsHeader from "@/components/tickets/TicketsHeader";

export default function TicketsPage() {

  return (
    <div>
      <TicketsHeader />
      <section className="w-full min-h-187.5 bg-main-secondary mt-6 rounded-lg">
        <TicketsContent />
      </section>
    </div>
  )
}