import dbConnect from "@/lib/mongodb";
import { hasPermission, requireSession } from "@/lib/permissionUtils";
import "@/models/Role";
import User from "@/models/User";
import { PERMISSIONS } from "@/types/Permissions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const session = await requireSession(); // Require session to access this route.
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // all || team
    const validTypes = ["team", "all"];
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid type." }, { status: 400 });
    }

    const isViewTeam = type === "team";
    const permissionStatus = await hasPermission(isViewTeam ? PERMISSIONS.TICKETS_TEAM_VIEW : PERMISSIONS.TICKETS_USERS_VIEW);
    if (!permissionStatus) {
      return NextResponse.json({ message: "Forbidden" });
    }

    let users = await User.find({}).populate("role", "key name").lean();
    const teamRoles: string[] = ["admin", "key"];
    users = users.filter((user) => isViewTeam ? teamRoles.includes(user.role.key) : !teamRoles.includes(user.role.key));

    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role.name,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    
    return NextResponse.json({ success: true, users: formattedUsers }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}