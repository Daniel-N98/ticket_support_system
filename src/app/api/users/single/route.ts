import dbConnect from "@/lib/mongodb";
import { hasPermission, requireSession } from "@/lib/permissionUtils";
import "@/models/Role";
import User from "@/models/User";
import { PERMISSIONS } from "@/types/Permissions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    await requireSession(); // Require session to access this route.
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const permissionStatus = await hasPermission(PERMISSIONS.TICKETS_USERS_VIEW);
    if (!permissionStatus) {
      return NextResponse.json({ message: "Forbidden." });
    }

    const user = await User.findById(userId).populate("role", "key name").lean();

    const formattedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json({ success: true, user: formattedUser }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}