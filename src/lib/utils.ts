import { AgentType } from "@/types/Agent";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTicketWithAgents(ticket: any) {
  const { _id, ...rest } = ticket;
  return {
    ...rest,
    customer: ticket.customer?.name ?? null,
    customerId: ticket.customer._id ?? null,
    customerEmail: ticket.customer?.email ?? null,
    customerImage: ticket.customer?.image ?? null,

    agent: Array.isArray(ticket.agent)
      ? ticket.agent.map((agent: AgentType) => ({
        name: agent.name,
        image: agent.image ?? null,
        email: agent.email ?? null,
      }))
      : [],
  };
}

export function formatTickets(tickets: any) {
  return tickets.map(({ customer, ...ticket }: any) => ({
    ...ticket,
    customer: customer?.name ?? null,
    customerEmail: customer?.email ?? null,
    customerImage: customer?.image ?? null,
  }));
}