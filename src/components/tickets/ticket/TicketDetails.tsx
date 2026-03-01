import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatusTag from "../tags/StatusTag";
import PriorityTag from "../tags/PriorityTag";
import { Calendar, Clock, Mail } from "lucide-react";
import { TicketType } from "@/types/Ticket";
import { AgentCell } from "../cells/AgentCell";
import { AgentType } from "@/types/Agent";

export default function TicketDetails({ ticket }: { ticket: TicketType }) {

  return (
    <Card className="bg-main-secondary border-white/10 text-white h-full">
      <CardHeader className="text-lg font-semibold border-b border-white/5">Details</CardHeader>

      <CardContent className="pt-6 space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold uppercase">
              {ticket.customer.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{ticket.customer}</p>
              <p className="text-xs text-white/40 flex items-center gap-1">
                <Mail className="w-3 h-3" /> {ticket.customerEmail}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-white/5" />

        <div className="flex justify-between items-center">
          <span className="text-white/40 text-sm">Status</span>
          <StatusTag status={ticket.status} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/40 text-sm">Priority</span>
          <PriorityTag priority={ticket.priority} />
        </div>

        <hr className="border-white/5" />

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between text-white/60">
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="w-3.5 h-3.5" /> Created
            </div>
            <span className="text-xs">{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between text-white/60">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-3.5 h-3.5" /> Last Update
            </div>
            <span className="text-xs">{new Date(ticket.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <hr className="border-white/5" />

        <div className="pt-2">
          <span className="text-xs text-white/30 block mb-1">Assigned Agent(s)</span>
          <div className="flex flex-col gap-2 text-sm italic text-white/60 mt-3">
            {ticket.agent && ticket.agent.length > 0 ? (
              ticket.agent.map((agent: AgentType, idx) => (
                <div className="flex items-center gap-x-2" key={idx}><AgentCell /> {agent.name} </div>
              ))
            ) : (
              <span>Unassigned</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}