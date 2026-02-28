import { Permission, ROLE_PERMISSIONS } from "@/types/Role";

export function hasPermission(
  role: string,
  permission: Permission
) {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}