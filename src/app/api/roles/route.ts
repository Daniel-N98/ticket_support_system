import dbConnect from "@/lib/mongodb";
import { requireSession } from "@/lib/permissionUtils";
import Role from "@/models/Role";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    await requireSession(); // Require session to access this route.
    const roles = await Role.find({});

    return NextResponse.json({ success: true, roles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
