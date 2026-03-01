"use client";

import { Button } from "@/components/ui/button";
import { deleteTicketByTicketId, fetchTicketByTicketId } from "@/lib/api/ticket.api";
import { TicketType } from "@/types/Ticket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Ticket() {
  const [ticket, setTicket] = useState<TicketType | null>(null);

  const { ticketId } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function loadTicket() {
      const ticketResponse: TicketType | null = await fetchTicketByTicketId(ticketId as string);
      if (ticketResponse) {
        setTicket(ticketResponse);
      }
    }
    loadTicket();
  }, []);

  async function deleteTicket() {
    const deleteResponse: string | null = await deleteTicketByTicketId(ticketId as string);
    if (deleteResponse) {
      toast.success("Ticket has been deleted.");
      router.push("/dashboard/tickets");
    }
  }

  return <div>
    <Button variant="destructive" className="hover:cursor-pointer" onClick={() => deleteTicket()}>Delete Ticket</Button>
  </div>
}