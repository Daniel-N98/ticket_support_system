import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface TicketButtonsProps {
  deleteTicket(): void;
  closeTicket(): void;
  router: ReturnType<typeof useRouter>;
}
export default function TicketButtons({ deleteTicket, closeTicket, router }: TicketButtonsProps) {

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="text-white/60 hover:text-white hover:bg-white/5 gap-2 hover:cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Tickets
      </Button>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button
          variant="ghost"
          onClick={closeTicket}
          className="text-white/60 text-[12px] md:text-sm hover:text-white hover:bg-white/5 gap-2 hover:cursor-pointer"
        >
          <Lock className="w-4 h-4" /> Close Ticket
        </Button>
        <Button
          variant="destructive"
          onClick={deleteTicket}
          className="gap-2 text-[12px] md:text-sm bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Delete Ticket
        </Button>
      </div>
    </>
  )
}