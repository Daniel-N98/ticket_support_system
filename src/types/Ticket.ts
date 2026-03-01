export type TicketType = {
  id?: string;
  ticketId: string;
  customer: string;
  customerEmail: string;
  customerImage: string | null;
  subject: string;
  status: "Open" | "Closed" | "Pending";
  priority: PriorityType;
  agent: string;
  createdAt: string;
};

export type PriorityType = "Low" | "Medium" | "High" | "Urgent";

export type Column<T, K extends keyof T = keyof T> = {
  key: K;
  header: string;
  render: (row: T) => React.ReactNode;
};

export type CreatedTicket = {
  subject: string;
  content: string;
  priority: PriorityType;
}