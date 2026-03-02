import dbConnect from "@/lib/mongodb";
import { requireSession } from "@/lib/permissionUtils";
import "@/models/User";
import Inbox from "@/models/Inbox";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const session = await requireSession(); // Require session to access this route.
    const userId: string = session.user.id;
    // All inboxes for this user.
    const inboxes = await Inbox.find({ users: userId }).sort({ updatedAt: -1 }).populate("users", "name image").lean();

    const formatted = inboxes.map((inbox) => ({
      id: inbox._id.toString(),
      users: inbox.users.map((user: { name: string, image: string }) => ({
        name: user.name,
        image: user.image ?? null,
      })),
      createdAt: inbox.createdAt,
      updatedAt: inbox.updatedAt,
    }));

    return NextResponse.json({ success: true, inbox: formatted }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { users } = await req.json();

  if (!users || users.length !== 2) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await requireSession();
    await dbConnect();

    // Create inbox
    const inboxMessage = await Inbox.create({ users });

    return NextResponse.json({ success: true, inbox: inboxMessage });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}