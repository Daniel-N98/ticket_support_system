export type TicketReplyType = {
  _id?: string;
  authorId: string;
  author: string;
  ticketId: string; // Actual ticket._id, not the ticketId
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export type TicketReplyTypeCrate = {
  ticketId: string;
  content: string;
}