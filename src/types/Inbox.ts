export type Inbox = {
  id?: string;
  users: string[]; // An array of users.
  createdAt: string;
  updatedAt: string;
}

export type InboxMessages = {
  id?: string;
  inboxId: string; // Reference to Inbox
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}