import apiClient from "../api";
import toast from "react-hot-toast";
import { CreatedTicket, Ticket } from "@/types/Ticket";

export async function postTicket({ customerId, subject, content, priority }: CreatedTicket): Promise<Ticket | null> {
  try {
    const response: { message: string, ticket: Ticket } = await apiClient.post("/ticket", { customerId, subject, content, priority });
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