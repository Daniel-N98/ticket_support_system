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