import { RoleType } from "@/types/Role";
import apiClient from "../api";

export async function fetchRoles(): Promise<RoleType[] | null> {
  try {
    const response: { message: string, roles: RoleType[] } = await apiClient.get(`/roles`);
    return response.roles;
  } catch (error) {
    return null;
  }
}