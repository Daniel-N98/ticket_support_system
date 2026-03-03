import { UserType } from "@/types/User";
import apiClient from "../api";
import toast from "react-hot-toast";

export async function fetchUsers(type: string): Promise<UserType[] | null> {
  try {
    const response: { message: string, users: UserType[]} = await apiClient.get(`/users?type=${type}`);
    if (response.message) {
      toast.error(response.message);
      return null;
    }
    return response.users;
  } catch (error) {
    return null;
  }
}