export type TicketType = {
  id?: string;
  ticketId: string;
  customer: string;
  customerEmail: string;
  customerImage: string | null;
  subject: string;
  content: string;
  status: "Open" | "Closed" | "Pending" | "Resolved";
  priority: PriorityType;
  agent: [];
  createdAt: string;
  updatedAt: string;
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