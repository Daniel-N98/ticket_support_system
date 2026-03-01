import dbConnect from "@/lib/mongodb";
import { hasPermission, requireSession } from "@/lib/permissionUtils";
import Ticket from "@/models/Ticket";
import TicketReply from "@/models/TicketReply";
import { PERMISSIONS } from "@/types/Permissions";
import { TicketType } from "@/types/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await requireSession(); // Require session to access this route.
    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get("ticketId");
    if (!ticketId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await dbConnect();
    const ticket: TicketType = await Ticket.findOne({ ticketId }).lean();
    const canView: boolean = await hasPermission(PERMISSIONS.TICKETS_ALL_VIEW, session);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 400 });
    }
    // User must either have permission, or be the ticket author.
    if (!canView && ticket.customer.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Load all the replies, attaching the email, image and name to each.
    const ticketReplies = await TicketReply.find({ ticketId: ticket._id }).sort({ createdAt: 1 }).populate("author", "email image name").lean();

    const formattedTickets = ticketReplies.map(({ author, ...ticket }) => ({
      ...ticket,
      author: author?.name ?? null,
      authorEmail: author?.email ?? null,
      authorImage: author?.image ?? null,
    }));

    return NextResponse.json({ success: true, ticketReplies: formattedTickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { ticketVisibleId, content } = await req.json();

  if (!ticketVisibleId || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const session = await requireSession();
    const userId: string = session.user.id;
    await dbConnect();

    const ticket = await Ticket.findOne({ ticketId: ticketVisibleId });
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 400 });
    }
    const isCustomer = userId === ticket.customer.toString();

    const canReply: boolean = await hasPermission(PERMISSIONS.TICKETS_ALL_REPLY, session);
    if (!canReply && !isCustomer) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Create Ticket Reply
    const ticketReply = await TicketReply.create({ ticketId: ticket._id, author: userId, content });

    const formattedTicket = {
      _id: ticketReply._id,
      ticketId: ticketReply.ticketId,
      content: ticketReply.content,
      createdAt: ticketReply.createdAt,
      updatedAt: ticketReply.updatedAt,
      author: session.user.name ?? null,
      authorEmail: session.user.email ?? null,
      authorImage: session.user.image ?? null,
    };


    if (ticketReply) {
      // If replying to own ticket, mark as pending (Waiting for agent reply), otherwise as Open
      if (isCustomer) {
        // Reply sent by ticket owner
        ticket.status = "Pending";
      } else {
        // Reply sent by agent or admin
        ticket.status = "Open";
        const agentId = session.user.id;
        if (!ticket.agent) {
          ticket.agent = [agentId];
        } else if (!ticket.agent.some((id: string) => id.toString() === agentId)) {
          ticket.agent.push(agentId);
        }
      }
      ticket.updatedAt = new Date();
      await ticket.save();

      return NextResponse.json({ message: "Ticket reply posted.", ticketReply: formattedTicket });
    } else {
      return NextResponse.json({ error: "Could not post reply." }, { status: 500 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Ticket could not be created." }, { status: 500 });
  }
}