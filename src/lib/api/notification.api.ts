import apiClient from "../api";
import { toastOrReturn } from "./util";
import { CreatedNotification, UserNotification } from "@/types/Notifications";

export async function fetchNotifications({ userId }: { userId: string }): Promise<UserNotification[] | null> {
  try {
    const response: { message: string, notifications: UserNotification } = await apiClient.get(`/notifications/user?userId=${userId}`);
    return toastOrReturn(response.message, response.notifications);
  } catch (error) {
    return null;
  }
}

export async function postNotification({ type, authorId, toUrl, content, ticketId, inboxId }: CreatedNotification): Promise<boolean | null> {
  try {
    const response: { message: string, success: boolean } = await apiClient.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications`, { type, authorId, toUrl, content, ticketId, inboxId });
    return toastOrReturn(response.message, response.success);
  } catch (error) {
    return null;
  }
}

export async function markNotificationAsRead({ userNotificationId }: { userNotificationId: string }): Promise<boolean | null> {
  try {
    const response: { message: string, success: boolean } = await apiClient.patch("/notifications/user", { userNotificationId });
    return toastOrReturn(response.message, response.success);
  } catch (error) {
    return null;
  }
}

export async function deleteUserNotification({ userNotificationId }: { userNotificationId: string }): Promise<boolean | null> {
  try {
    const response: { message: string, success: boolean } = await apiClient.delete("/notifications/user", { data: { userNotificationId } });
    return toastOrReturn(response.message, response.success);
  } catch (error) {
    return null;
  }
}