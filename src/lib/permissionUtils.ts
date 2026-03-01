import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Permission, ROLE_PERMISSIONS } from "@/types/Role";
import { getServerSession, Session } from "next-auth";

export async function hasPermission(permission: Permission, session?: Session | null) {
  const serverSession = session ?? await requireSession();
  return ROLE_PERMISSIONS[serverSession.user.role]?.includes(permission) ?? false;
}

export async function requirePermission(permission: string, session?: Session) {
  return await hasPermission(permission, session || null);
}

export async function requireSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}