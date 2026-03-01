export type InboxMessage = {
  id?: string;
  users: string[]; // An array of users.
  createdAt: string;
  updatedAt: string;
}

export type InboxMessages = {
  inboxId: string; // Reference to InboxMessage
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}