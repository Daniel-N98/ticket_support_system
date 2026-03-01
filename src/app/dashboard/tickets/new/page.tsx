"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import NewTicketForm from "@/components/tickets/new/NewTicketForm";
import NewTicketHeader from "@/components/tickets/new/NewTicketHeader";
import { PriorityType, TicketType } from "@/types/Ticket";
import { postTicket } from "@/lib/api/ticket.api";
import { useRouter } from "next/navigation";


export default function NewTicketPage() {
  const [loading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const subject = formData.get("subject") as string;
    const content = formData.get("content") as string;
    const priority = formData.get("priority") as PriorityType;
    if (!subject || !content || !priority) {
      return;
    }

    const createdTicket: TicketType | null = await postTicket({ subject, content, priority });
    if (createdTicket) {
      // Ticket has been created. Navigate to this ticket.
      router.push(`/dashboard/tickets/${createdTicket.ticketId}`);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="h-12" />

      <section className="w-full min-h-[187.5px] bg-main-secondary mt-9 rounded-lg flex justify-center">
        <div className="w-full max-w-3xl p-8 md:p-10">

          {/* Header Section */}
          <NewTicketHeader />
          <NewTicketForm handleSubmit={handleSubmit} loading={loading} />

          <div className="w-max py-3 p-6 mt-10 flex items-center gap-2 text-white/50 text-xs bg-white/5 rounded-md">
            <AlertCircle className="w-4 h-4" />
            <span>Average response time: &lt; 24 hours</span>
          </div>
        </div>
      </section>
    </div>
  );
}