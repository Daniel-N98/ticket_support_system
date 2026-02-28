import dbConnect from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import { CreatedTicket } from "@/types/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect()

  try {
    const tickets = await Ticket.find({})
      .populate("customer", "email image")
      .lean();

    const formattedTickets = tickets.map(({ customer, ...ticket }) => ({
      ...ticket,
      customerEmail: customer?.email ?? null,
      customerImage: customer?.image ?? null,
    }));

    return NextResponse.json(
      { success: true, data: formattedTickets },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const { customerId, subject, content, priority }: CreatedTicket = await req.json();

  if (!customerId || !subject || !content || !priority) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await dbConnect();
    // Check user exists.
    const userExists = await User.exists({ _id: customerId });
    if (!userExists) {
      return NextResponse.json({ error: "User does not exist." }, { status: 400 });
    }
    // Create ticket
    const ticket = await Ticket.create({ customer: customerId, subject, content, priority: priority.toLowerCase() });

    return NextResponse.json({ message: "Ticket successfully created.", ticket });
  } catch (error) {
    return NextResponse.json({ error: "Ticket could not be created." }, { status: 500 });
  }
}