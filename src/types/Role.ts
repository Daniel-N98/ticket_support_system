import { PERMISSIONS } from "./Permissions";

export type Permission = string;
export type Role = "admin" | "agent" | "user";

export interface RoleType {
  _id?: string;
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
    PERMISSIONS.TICKETS_CREATE,
  ],
  agent: [
    PERMISSIONS.TICKETS_ALL_VIEW,
    PERMISSIONS.TICKETS_ALL_REPLY,
    PERMISSIONS.TICKETS_ALL_EDIT,
    PERMISSIONS.TICKETS_OWN_VIEW,
    PERMISSIONS.TICKETS_OWN_REPLY,
    PERMISSIONS.TICKETS_CREATE,
    PERMISSIONS.TICKETS_TEAM_VIEW,
    PERMISSIONS.TICKETS_USERS_VIEW,
  ],
  admin: [
    PERMISSIONS.TICKETS_ALL_VIEW,
    PERMISSIONS.TICKETS_ALL_REPLY,
    PERMISSIONS.TICKETS_DELETE,
    PERMISSIONS.TICKETS_CREATE,
    PERMISSIONS.TICKETS_TEAM_VIEW,
    PERMISSIONS.TICKETS_USERS_VIEW,
    PERMISSIONS.USERS_EDIT,
    PERMISSIONS.SETTINGS_EDIT
  ],
};