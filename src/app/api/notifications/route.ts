import dbConnect from "@/lib/mongodb";
import { checkForBanError } from "@/lib/permissionUtils";
import Inbox from "@/models/Inbox";
import Notification from "@/models/Notification";
import Role from "@/models/Role";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import UserNotification from "@/models/UserNotification";
import { CreatedNotification, NotificationType } from "@/types/Notifications";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { type, authorId, toUrl, content, ticketId, inboxId }: CreatedNotification = await req.json();

  if (!type || !content || !authorId || !toUrl) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await dbConnect();
    // Check user exists.
    const userExists = await User.exists({ _id: authorId });
    if (!userExists) {
      return NextResponse.json({ error: "User does not exist." }, { status: 400 });
    }
    // Create ticket
    const notification = await Notification.create({ type, authorId, toUrl, content });
    if (!notification) {
      return NextResponse.json({ message: "Could not create notification.", success: false });
    }
    // Send notification to all required users.
    sendNotifications(notification, ticketId, inboxId);
    return NextResponse.json({ message: "Ticket successfully created.", success: true });
  } catch (error) {
    console.log(error);

    return checkForBanError(error);
  }
}

async function sendNotifications(
  notification: NotificationType,
  ticketId?: string,
  inboxId?: string
) {
  const roles = await Role.find({}).lean();

  const agentRoleId = roles.find(r => r.key === "agent")?._id;
  const adminRoleId = roles.find(r => r.key === "admin")?._id;

  if (!agentRoleId || !adminRoleId) return false;

  switch (notification.type) {
    case "ticket": {
      // Notify all agents + admins
      const users = await User.find({ role: { $in: [agentRoleId, adminRoleId] }, }).select("_id").lean();
      return createNotifications(users.map(u => u._id), notification);
    }

    case "ticket-reply": {
      if (!ticketId) return false;

      const ticket = await Ticket.findById(ticketId).lean();
      if (!ticket) return false;

      const isCustomerReply = ticket.customer.toString() === notification.authorId.toString();

      // Customer replied → notify assigned agents
      if (isCustomerReply) {
        if (!ticket.agents?.length) return false;
        return createNotifications(ticket.agents, notification);
      }

      // Agent replied → notify customer
      await UserNotification.create({
        userId: ticket.customer,
        notificationId: notification._id,
        read: false,
      });

      return true;
    }

    case "inbox-message":
      const inbox = await Inbox.findById(inboxId);
      if (!inbox) return;
      const otherUser = inbox.users.filter((user: string) => user.toString() === notification.authorId.toString());
      return createNotifications(otherUser, notification);
    default:
      return false;
  }
}

const createNotifications = async (userIds: string[], notification: NotificationType) => {
  if (userIds.length === 0) return false;

  await UserNotification.insertMany(userIds.map(userId => ({ userId, notificationId: notification._id, read: false, })));

  return true;
};