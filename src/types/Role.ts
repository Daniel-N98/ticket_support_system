import { PERMISSIONS } from "./Permissions";

export type Permission = string;
export type Role = "admin" | "agent" | "user";

export interface RoleType {
  key: Role;          // "admin", "agent", "user"
  name: string;
  permissions: Permission[];
}

// Type returned from the server.
export interface SafeRole extends RoleType {
  _id: string;
}

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  user: [
    PERMISSIONS.TICKETS_OWN_VIEW,
    PERMISSIONS.TICKETS_OWN_REPLY,
  ],
  admin: [
    PERMISSIONS.TICKETS_ALL_VIEW,
    PERMISSIONS.TICKETS_ALL_REPLY,
  ],
};