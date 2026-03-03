import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { Permission, ROLE_PERMISSIONS } from "@/types/Role";
import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";

export async function hasPermission(permission: Permission, session?: Session | null) {
  const serverSession = session ?? await requireSession();
  return ROLE_PERMISSIONS[serverSession.user.role]?.includes(permission) ?? false;
}

export async function requirePermission(permission: string, session?: Session) {
  return await hasPermission(permission, session || null);
}

export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (session?.user.status === "banned") {
    throw new AuthError("Unauthorized - Account is banned.", 1000);
  }
  const user = await User.findById(session?.user.id);
  if (user.status === "banned") {
    throw new AuthError("Unauthorized - Account is banned.", 1000);
  }
  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export function checkForBanError(error: any) {
  if (error instanceof AuthError) {
    return NextResponse.json(
      { success: false, reason: "banned", message: error.message },
      { status: 403 }
    );
  }
  return NextResponse.json({ success: false, error }, { status: 500 });
}

export class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 403) {
    super(message);
    this.statusCode = statusCode;
  }
}