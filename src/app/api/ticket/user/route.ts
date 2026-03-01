import dbConnect from "@/lib/mongodb";
import { hasPermission, requireSession } from "@/lib/permissionUtils";
import Ticket from "@/models/Ticket";
import { PERMISSIONS } from "@/types/Permissions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {
    const session = await requireSession(); // Require session to access this route.
    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get("ticketId");
    if (!ticketId) {
      return NextResponse.json({});
    }

    await dbConnect();
    const ticket = await Ticket.findOne({ ticketId }).populate("customer", "email image name").lean();
    if (!ticket) {
      return NextResponse.json({});
    }
    const canViewAll: boolean = await hasPermission(PERMISSIONS.TICKETS_ALL_VIEW, session);
    if (!canViewAll && ticket.customer._id.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { _id, ...rest } = ticket;

    const formattedTicket = {
      ...rest,
      customer: ticket.customer?.name ?? null,
      customerEmail: ticket.customer?.email ?? null,
      customerImage: ticket.customer?.image ?? null,
    };

    return NextResponse.json({ success: true, ticket: formattedTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}