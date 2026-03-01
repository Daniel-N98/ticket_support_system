import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TicketType } from "@/types/Ticket";

export default function TicketContent({ ticket }: { ticket: TicketType }) {

  return (
    <Card className="bg-main-secondary border-white/10 text-white min-h-96 flex flex-col">
      <CardHeader className="border-b border-white/5 pb-6">
        <span className="text-white/40 text-sm mb-2">Ticket ID: {ticket.ticketId}</span>
        <h1 className="text-3xl font-bold tracking-tight">{ticket.subject}</h1>
      </CardHeader>
      <CardContent className="pt-6 flex-1">
        <div
          className="ticket-content"
          dangerouslySetInnerHTML={{ __html: ticket.content }}
        />
      </CardContent>
    </Card>
  )
}