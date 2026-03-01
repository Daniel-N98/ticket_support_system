import { TicketReplyType, TicketReplyTypeCrate } from "@/types/TicketReply";
import apiClient from "../api";
import toast from "react-hot-toast";
import { TicketType } from "@/types/Ticket";

export async function fetchTicketReplies(ticketId: string): Promise<TicketReplyType[] | null> {
  try {
    const response: { message: string, ticketReplies: TicketReplyType[] } = await apiClient.get(`/ticket/reply?ticketId=${ticketId}`);
    return response.ticketReplies;
  } catch (error) {
    return null;
  }
}

export async function postTicketReply({ ticketId, content }: TicketReplyTypeCrate): Promise<{ ticketReply: TicketReplyType, ticket: TicketType } | null> {
  try {
    const response: { message: string, ticketReply: TicketReplyType, updatedTicket: TicketType } = await apiClient.post("/ticket/reply", { ticketVisibleId: ticketId, content });
    toast.success(response.message);
    return { ticketReply: response.ticketReply, ticket: response.updatedTicket };
  } catch (error) {
    // @ts-expect-error Random
    if (error.response?.data?.error) {
      // @ts-expect-error Random
      toast.error(error.response.data.error);
    } else {
      toast.error("An unknown error occurred.");
    }
    return null;
  }
}