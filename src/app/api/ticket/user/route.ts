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

export async function PATCH(request: Request) {
  await dbConnect()
  try {
    const session = await requireSession(); // Require session to access this route.

    const body: { ticketId: string; updateKey: string; newValue: string } = await request.json();
    const canEdit: boolean = await hasPermission(PERMISSIONS.TICKETS_ALL_EDIT, session);
    const ticket = await Ticket.findOne({ ticketId: body.ticketId }).populate("customer", "email image name").lean();

    if (!canEdit && ticket.customer._id.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const validUpdatableFields: string[] = ["agent", "status", "priority"];
    if (!validUpdatableFields.includes(body.updateKey)) {
      return NextResponse.json({ error: "Value cannot be updated." }, { status: 403 });
    }
    // If updateKey is agent, add this agent to the array if it exists.
    const value = (body.updateKey === "agent" && ticket.agent) ? [...ticket.agent, body.newValue] : [body.newValue];

    const updated = await Ticket.findByIdAndUpdate(
      ticket._id,
      { [body.updateKey]: value },
      { returnDocument: 'after' }
    )

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Ticket not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, ticket: updated }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}