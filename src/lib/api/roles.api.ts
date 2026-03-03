import { RoleType } from "@/types/Role";
import apiClient from "../api";
import { toastOrReturn } from "./util";

export async function fetchRoles(): Promise<RoleType[] | null> {
  try {
    const response: { message: string, roles: RoleType[] } = await apiClient.get(`/roles`);
    return toastOrReturn(response.message, response.roles);
  } catch (error) {
    return null;
  }
}