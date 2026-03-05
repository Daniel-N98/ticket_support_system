export type NotificationType = {
  _id: string;
  type: string;
  authorId: string;
  toUrl: string;
  content: string;
  ticketId?: string;
  inboxId?: string;
  createdAt: string;
}

export type CreatedNotification = {
  type: string;
  authorId: string;
  toUrl: string;
  content: string;
  ticketId?: string;
  inboxId?: string;
}

export type UserNotification = {
  _id: string;
  notificationId: string;
  content: string;
  read: boolean;
  toUrl: string;
  createdAt: string;
}