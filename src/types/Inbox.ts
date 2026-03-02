export type Inbox = {
  id?: string;
  users: {name: string, image?: string | null}[]; // An array of users.
  createdAt: string;
  updatedAt: string;
}

export type InboxMessages = {
  id?: string;
  inboxId: string; // Reference to Inbox
  content: string;
  author: string;
  authorId?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}