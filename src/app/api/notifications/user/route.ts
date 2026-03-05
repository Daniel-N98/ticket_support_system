import "@/models/Notification";
import dbConnect from "@/lib/mongodb";
import { checkForBanError, requireSession } from "@/lib/permissionUtils";
import UserNotification from "@/models/UserNotification";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const session = await requireSession(); // Require session to access this route.
    const notifications = await UserNotification.find({ userId: session.user.id }).populate("notificationId", "_id content toUrl").sort({ createdAt: -1 });
    const mapped = notifications.map((notification) => {
      return {
        _id: notification.id,
        notificationId: notification.notificationId._id.toString(),
        content: notification.notificationId.content,
        toUrl: notification.notificationId.toUrl,
        userId: notification.userId.toString(),
        read: notification.read,
        createdAt: notification.createdAt,
      }
    });

    return NextResponse.json({ success: true, notifications: mapped }, { status: 200 });
  } catch (error) {
    return checkForBanError(error);
  }
}

export async function PATCH(request: Request) {
  await dbConnect();

  try {
    const session = await requireSession(); // Require session to access this route.

    const body: { userNotificationId: string } = await request.json();
    const notification = await UserNotification.findById(body.userNotificationId);
    if (notification.userId.toString() !== session.user.id) {
      return NextResponse.json({ message: "Forbidden." });
    }

    if (!notification) {
      return NextResponse.json({ message: "No notification found." });
    }

    notification.read = true;
    await notification.save();

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return checkForBanError(error);
  }
}