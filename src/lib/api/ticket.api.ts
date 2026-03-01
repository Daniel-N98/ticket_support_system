import apiClient from "../api";
import toast from "react-hot-toast";
import { CreatedTicket, TicketType } from "@/types/Ticket";

export async function fetchTickets(): Promise<TicketType[] | null> {
  try {
    const response: { message: string, tickets: TicketType[] } = await apiClient.get("/ticket");
    return response.tickets;
  } catch (error) {
    return null;
  }
}

export async function fetchTicketByTicketId(ticketId: string): Promise<TicketType | null> {
  try {
    const response: { message: string, ticket: TicketType } = await apiClient.get(`/ticket/user?ticketId=${ticketId}`);
    return response.ticket;
  } catch (error) {
    return null;
  }
}

export async function postTicket({ subject, content, priority }: CreatedTicket): Promise<TicketType | null> {
  try {
    const response: { message: string, ticket: TicketType } = await apiClient.post("/ticket", { subject, content, priority });
    toast.success(response.message);
    return response.ticket;
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

export async function deleteTicketByTicketId(ticketId: string): Promise<string | null> {
  try {
    const response: { message: string, ticketId: string } = await apiClient.delete("/ticket", { data: { ticketId } });
    return response.ticketId;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}

export async function updateTicketByTicketId(ticketId: string, updateKey: string, newValue: string): Promise<TicketType | null> {
  try {
    const response: { message: string, ticket: TicketType } = await apiClient.patch("/ticket/user", { ticketId, updateKey, newValue });
    return response.ticket;
  } catch (error) {
    return null;
  }
}