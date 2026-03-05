import "@/models/Notification";
import dbConnect from "@/lib/mongodb";
import { checkForBanError, requireSession } from "@/lib/permissionUtils";
import UserNotification from "@/models/UserNotification";
import { NextResponse } from "next/server";
import Notification from "@/models/Notification";

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

export async function DELETE(request: Request) {

  try {
    const { userNotificationId }: { userNotificationId: string } = await request.json();
    const session = await requireSession();

    await dbConnect()
    const notification = await UserNotification.findById(userNotificationId);
    if (!notification) {
      return NextResponse.json({ message: "Notification not found." }, { status: 200 });
    }
    if (session.user.id !== notification.userId.toString()) {
      return NextResponse.json({ message: "Cannot delete another user's notification." }, { status: 200 });
    }
    const notificationId = notification.notificationId;
    const otherUsersNotifications = await UserNotification.find({ notificationId });
    if (otherUsersNotifications.length === 1) {
      // This is the only notification. Delete the main notification.
      await Notification.findByIdAndDelete(notificationId);
    }

    await notification.deleteOne({ _id: notification._id });
    return NextResponse.json({ success: true })
  } catch (error) {
    return checkForBanError(error);
  }
}