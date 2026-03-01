"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteTicketByTicketId, fetchTicketByTicketId, updateTicketByTicketId } from "@/lib/api/ticket.api";
import { TicketType } from "@/types/Ticket";
import toast from "react-hot-toast";
import TicketButtons from "./TicketButtons";
import TicketDetails from "./TicketDetails";
import TicketContent from "./TicketContent";
import { Skeleton } from "@/components/ui/skeleton";
import RepliesSection from "./replies/RepliesSection";

export default function Ticket() {
  const [ticket, setTicket] = useState<TicketType | null>(null);
  const { ticketId } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function loadTicket() {
      const ticketResponse: TicketType | null = await fetchTicketByTicketId(ticketId as string);
      if (ticketResponse) setTicket(ticketResponse);
    }
    loadTicket();
  }, [ticketId]);

  async function deleteTicket() {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    const deleteResponse: string | null = await deleteTicketByTicketId(ticketId as string);
    if (deleteResponse) {
      toast.success("Ticket has been deleted.");
      router.push("/dashboard/tickets");
    }
  }

  async function toggleTicketStatus() {
    if (!confirm("Ar you sure you want to close this ticket?")) return;

    const updateResponse: TicketType | null = await updateTicketByTicketId(ticketId as string, "status", ["Open", "Pending"].includes(ticket?.status as string) ? "Closed" : "Open");
    if (updateResponse) {
      toast.success(`"Ticket has been ${updateResponse.status === "Open" ? "Opened" : "Closed"}`);
      setTicket((prevTicket: TicketType | null) => prevTicket ? { ...prevTicket, status: updateResponse.status } : null);
    }
  }

  if (!ticket) return <TicketSkeleton />;

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between">
        <TicketButtons
          deleteTicket={deleteTicket}
          toggleTicketStatus={toggleTicketStatus}
          ticketOpen={["Open", "Pending"].includes(ticket?.status)}
          router={router}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col space-y-6">
          <TicketContent ticket={ticket} />
          {/* Replies section aligned with TicketContent */}
          <RepliesSection ticketId={ticket.ticketId} setTicket={setTicket} />
        </div>

        <div className="flex flex-col">
          <TicketDetails ticket={ticket} />
        </div>
      </div>
    </div>
  );
}

function TicketSkeleton() {
  return (
    <div className="p-8 space-y-6 animate-pulse">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-48 bg-white/5" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-36 bg-white/5" />
          <Skeleton className="h-10 w-36 bg-white/5" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-110 bg-white/5 rounded-xl" />
        <Skeleton className="h-110 bg-white/5 rounded-xl" />
      </div>
    </div>
  );
}