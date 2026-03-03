import { UserType } from "@/types/User";
import apiClient from "../api";
import toast from "react-hot-toast";
import { toastOrReturn } from "./util";

export async function fetchUsers(type: string): Promise<UserType[] | null> {
  try {
    const response: { message: string, users: UserType[] } = await apiClient.get(`/users?type=${type}`);
    if (response.message) {
      toast.error(response.message);
      return null;
    }
    return response.users;
  } catch (error) {
    return null;
  }
}

export async function fetchUser({ userId }: { userId: string }): Promise<UserType | null> {
  try {
    const response: { message: string, user: UserType } = await apiClient.get(`/users/single?userId=${userId}`);
    if (response.message) {
      toast.error(response.message);
      return null;
    }
    return response.user;
  } catch (error) {
    return null;
  }
}

export async function updateUser({userId, updateKey, newValue}: {userId: string; updateKey: string; newValue: string}): Promise<UserType | null> {
  try {
    const response: { message: string, user: UserType } = await apiClient.patch("/users/single", { userId, updateKey, newValue });
    return toastOrReturn(response.message, response.user);
  } catch (error) {
    return null;
  }
}