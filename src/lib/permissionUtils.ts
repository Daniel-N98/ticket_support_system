import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Permission, ROLE_PERMISSIONS } from "@/types/Role";
import { getServerSession } from "next-auth";

export async function hasPermission(permission: Permission) {
  const session = await requireSession();
  return ROLE_PERMISSIONS[session.user.role]?.includes(permission) ?? false;
}

export async function requirePermission(permission: string) {
  return await hasPermission(permission);
}

export async function requireSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}