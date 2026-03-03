import dbConnect from "@/lib/mongodb";
import { hasPermission, requireSession } from "@/lib/permissionUtils";
import "@/models/Role";
import Role from "@/models/Role";
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

export async function PATCH(request: Request) {
  await dbConnect()
  try {
    const session = await requireSession(); // Require session to access this route.
    const body = await request.json();
    const { userId, updateKey } = body;
    let { newValue } = body;

    if (!userId || !updateKey || !newValue) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const canEdit: boolean = await hasPermission(PERMISSIONS.USERS_EDIT, session);
    if (!canEdit) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const validUpdateKeys = ["role", "status"];
    if (!validUpdateKeys.includes(updateKey)) {
      return NextResponse.json({ error: "Invalid field." }, { status: 400 });
    }
    let role = null;
    if (updateKey === "role") {
      role = await Role.findOne({ name: newValue });
      if (!role) {
        // Invalid role.
        return NextResponse.json({ error: "Invalid role." }, { status: 400 });
      } else {
        newValue = role._id.toString();
      }
    }
    if (updateKey === "status" && !["banned", "active"].includes(newValue)) {
      // Invalid status.
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    // At this point, user has permission, key and value are both valid.
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }

    user[updateKey] = newValue;
    await user.save();
    
    const formattedUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: role.name,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json({ success: true, user: formattedUser }, { status: 200 })
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}