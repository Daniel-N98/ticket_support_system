import { Inbox, InboxMessages } from "@/types/Inbox";
import apiClient from "../api";
import toast from "react-hot-toast";

export async function fetchInbox(): Promise<Inbox[] | null> {
  try {
    const response: { message: string, inbox: Inbox[] } = await apiClient.get(`/inbox`);
    return response.inbox;
  } catch (error) {
    return null;
  }
}

export async function postInbox({ users }: { users: string[] }): Promise<Inbox | null> {
  try {
    const response: { message: string, inbox: Inbox } = await apiClient.post("/inbox", { users });
    return response.inbox;
  } catch (error) {
    return null;
  }
}

export async function fetchInboxMessagesById({ inboxId }: { inboxId: string }): Promise<InboxMessages[] | null> {
  try {
    const response: { message: string, inboxMessages: InboxMessages[] } = await apiClient.get(`/inbox/messages?inboxId=${inboxId}`);
    return response.inboxMessages;
  } catch (error) {
    return null;
  }
}

export async function postInboxMessage({ inboxId, message }: { inboxId: string, message: string }): Promise<InboxMessages | null> {
  try {
    const response: { message: string, inboxMessage: InboxMessages } = await apiClient.post("/inbox/messages", { inboxId, message });
    return response.inboxMessage;
  } catch (error) {
    return null;
  }
}