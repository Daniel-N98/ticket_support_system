export type TickerReplyType = {
  id?: string;
  author: string;
  ticketId: string; // Actual ticket._id, not the ticketId
  content: string;
  createdAt: string;
  updatedAt?: string;
}