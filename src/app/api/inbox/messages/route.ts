import { postNotification } from "@/lib/api/notification.api";
import { fetchSettings } from "@/lib/api/siteSettings.api";
import dbConnect from "@/lib/mongodb";
import { checkForBanError, requireSession } from "@/lib/permissionUtils";
import Inbox from "@/models/Inbox";
import InboxMessages from "@/models/InboxMessages";
import { SiteSettingsType } from "@/types/SiteSettings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const settingsResponse = await fetchSettings();
  if (settingsResponse?.find((setting: SiteSettingsType) => setting.key === "inbox-enabled")!.value === false) {
    return NextResponse.json({ message: "Messages are currently disabled." });
  }

  await dbConnect();

  try {
    const session = await requireSession(); // Require session to access this route.
    const userId: string = session.user.id;

    const { searchParams } = new URL(req.url);
    const inboxId = searchParams.get("inboxId");
    if (!inboxId) {
      return NextResponse.json({ error: "Inbox not found" }, { status: 200 });
    }
    const inbox = await Inbox.findById(inboxId).lean();

    // All inbox messages
    if (!inbox.users.map((u: string[]) => u.toString()).includes(userId)) {
      // User is not part of this inbox.
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const inboxMessages = await InboxMessages.find({ inboxId: inbox._id }).sort({ updatedAt: 1 }).populate("author", "name").lean();

    const formatted = inboxMessages.map((message) => ({
      id: message._id.toString(),
      author: message.author.name,
      authorId: message.author._id,
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    }));

    return NextResponse.json({ success: true, inboxMessages: formatted }, { status: 200 });
  } catch (error) {
    return checkForBanError(error);
  }
}

export async function POST(req: NextRequest) {
  const { inboxId, message } = await req.json();
  const settingsResponse = await fetchSettings();
  if (settingsResponse?.find((setting: SiteSettingsType) => setting.key === "inbox-enabled")!.value === false) {
    return NextResponse.json({ message: "Messages are currently disabled." });
  }

  if (!inboxId || !message || message.length < 1) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const session = await requireSession();
    await dbConnect();
    const inbox = await Inbox.findById(inboxId);

    if (!inbox) {
      return NextResponse.json({ error: "Inbox could not be found." }, { status: 500 });
    }

    if (!inbox.users.map((u: string[]) => u.toString()).includes(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Create inbox
    const inboxMessage = await InboxMessages.create({ inboxId, content: message, author: session.user.id });
    if (!inboxMessage) {
      return NextResponse.json({ error: "Inbox message could not be created." }, { status: 500 });
    }
    inbox.updatedAt = new Date();
    await inbox.save();
    const populatedMessage = await inboxMessage.populate("author", "name image");
    const formatted = {
      id: populatedMessage._id.toString(),
      author: populatedMessage.author.name,
      authorId: populatedMessage.author._id,
      content: populatedMessage.content,
      createdAt: populatedMessage.createdAt,
      updatedAt: populatedMessage.updatedAt,
    };
    await postNotification({ type: "inbox-message", authorId: formatted.authorId.toString(), toUrl: `/dashboard/inbox?to=${session.user.id}`, content: `New inbox message from ${session.user.name}`, inboxId: inboxId });
    return NextResponse.json({ success: true, inboxMessage: formatted });
  } catch (error) {
    return checkForBanError(error);
  }
}