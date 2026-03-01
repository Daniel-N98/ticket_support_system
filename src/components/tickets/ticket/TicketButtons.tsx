import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock, Trash2, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";

interface TicketButtonsProps {
  deleteTicket(): void;
  toggleTicketStatus(): void;
  ticketOpen: boolean;
  router: ReturnType<typeof useRouter>;
}
export default function TicketButtons({ deleteTicket, toggleTicketStatus, ticketOpen, router }: TicketButtonsProps) {

  return (
    <div className="flex flex-col md:flex-row items-start md:justify-between -mb-3 md:mb-0 w-full">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/tickets")}
        className="text-white/60 hover:text-white hover:bg-white/5 gap-2 hover:cursor-pointer -ml-4"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Tickets
      </Button>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button
          variant="ghost"
          onClick={toggleTicketStatus}
          className="text-white/60 text-[12px] md:text-sm hover:text-white hover:bg-white/5 gap-2 hover:cursor-pointer"
        >
          {ticketOpen ? <><Lock className="w-4 h-4" /> Close Ticket</> : <><Unlock className="w-4 h-4" />Reopen Ticket</>}
        </Button>
        <Button
          variant="destructive"
          onClick={deleteTicket}
          className="gap-2 text-[12px] md:text-sm bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Delete Ticket
        </Button>
      </div>
    </div>
  )
}