import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Lock, Trash2, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";

interface TicketButtonsProps {
  deleteTicket(): void;
  toggleTicketStatus(status?: string): void;
  ticketOpen: boolean;
  router: ReturnType<typeof useRouter>;
  role: string;
}
export default function TicketButtons({ deleteTicket, toggleTicketStatus, ticketOpen, router, role }: TicketButtonsProps) {

  return (
    <div className="flex flex-col md:flex-row items-start md:justify-between -mb-3 md:mb-0 w-full">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/tickets")}
        className="text-white/60 hover:text-white hover:bg-white/5 gap-2 hover:cursor-pointer -ml-4"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Tickets
      </Button>
      {role !== "user" &&
        <div className="flex md:items-center justify-end w-full space-x-2 md:space-x-4">
          {ticketOpen && <Button variant="ghost" onClick={() => toggleTicketStatus("Resolve")} className="text-white text-[12px] md:text-sm bg-green-500/70 hover:text-white hover:bg-white/5 gap-2 hover:cursor-pointer">
            <Check className="w-4 h-4" />Mark resolved
          </Button>
          }
          <Button
            variant="ghost"
            onClick={() => toggleTicketStatus(ticketOpen ? "Close" : "Open")}
            className="text-white text-[12px] md:text-sm bg-blue-500 hover:text-white hover:bg-white/5 gap-2 hover:cursor-pointer"
          >
            {ticketOpen ? <><Lock className="w-4 h-4" /> Close Ticket</> : <><Unlock className="w-4 h-4" />Reopen Ticket</>}
          </Button>
          {role === "admin" &&
            <Button
              variant="destructive"
              onClick={deleteTicket}
              className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          }
        </div>
      }
    </div>
  )
}