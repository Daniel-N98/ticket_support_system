import dbConnect from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import { CreatedTicket } from "@/types/Ticket";
import { NextRequest, NextResponse } from "next/server";
import { hasPermission, requirePermission, requireSession } from "@/lib/permissionUtils";
import { PERMISSIONS } from "@/types/Permissions";

export async function GET() {
  await dbConnect();

  try {
    const session = await requireSession(); // Require session to access this route.
    const canViewAll = await hasPermission(PERMISSIONS.TICKETS_ALL_VIEW);

    const query = canViewAll ? {} : { customer: session.user.id };
    const tickets = await Ticket.find(query).populate("customer", "email image name").lean();

    const formattedTickets = tickets.map(({ customer, ...ticket }) => ({
      ...ticket,
      customer: customer?.name ?? null,
      customerEmail: customer?.email ?? null,
      customerImage: customer?.image ?? null,
    }));

    return NextResponse.json({ success: true, tickets: formattedTickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { subject, content, priority }: CreatedTicket = await req.json();

  if (!subject || !content || !priority) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const session = await requireSession();
    if (!await requirePermission(PERMISSIONS.TICKETS_CREATE)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    // Check user exists.
    const userId = session.user.id;
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json({ error: "User does not exist." }, { status: 400 });
    }
    // Create ticket
    const ticket = await Ticket.create({ customer: userId, subject, content, priority });

    return NextResponse.json({ message: "Ticket successfully created.", ticket });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Ticket could not be created." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { ticketId }: { ticketId: string } = await request.json();
    const session = await requireSession();

    await dbConnect()
    const ticket = await Ticket.findOne({ ticketId }).lean();
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 200 });
    }

    // Must have the delete ticket permission (Ticket creator cannot delete their ticket.)
    const hasPermission = await requirePermission(PERMISSIONS.TICKET_DELETE, session);
    if (!hasPermission) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const deleted = await Ticket.deleteOne({ _id: ticket._id });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Ticket not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, ticketId },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}