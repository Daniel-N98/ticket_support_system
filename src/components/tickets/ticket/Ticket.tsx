"use client";

import { Button } from "@/components/ui/button";
import { deleteTicketByTicketId } from "@/lib/api/ticket.api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Ticket() {
  const { ticketId } = useParams();
  const router = useRouter();

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