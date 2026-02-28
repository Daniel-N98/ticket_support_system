export type Ticket = {
  id: string;
  customer: string;
  customerEmail: string;
  customerImage: string | null;
  subject: string;
  status: "Open" | "Closed" | "Pending";
  priority: "Low" | "Medium" | "High" | "Urgent";
  agent: string;
  date: string;
};

export type Column<T, K extends keyof T = keyof T> = {
  key: K;
  header: string;
  render: (row: T) => React.ReactNode;
};