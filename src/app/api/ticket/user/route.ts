import { fetchSettings } from "@/lib/api/siteSettings.api";
import dbConnect from "@/lib/mongodb";
import { checkForBanError, hasPermission, requireSession } from "@/lib/permissionUtils";
import { formatTicketWithAgents } from "@/lib/utils";
import Ticket from "@/models/Ticket";
import { PERMISSIONS } from "@/types/Permissions";
import { SiteSettingsType } from "@/types/SiteSettings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const settingsResponse = await fetchSettings();
  if (settingsResponse?.find((setting: SiteSettingsType) => setting.key === "tickets-enabled")!.value === false) {
    return NextResponse.json({ message: "Tickets are currently disabled." });
  }
  try {
    const session = await requireSession(); // Require session to access this route.
    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get("ticketId");
    if (!ticketId) {
      return NextResponse.json({});
    }

    await dbConnect();
    const ticket = await Ticket.findOne({ ticketId }).populate("customer", "email image name").populate("agent", "email name image").lean();
    if (!ticket) {
      return NextResponse.json({});
    }
    const canViewAll: boolean = await hasPermission(PERMISSIONS.TICKETS_ALL_VIEW, session);
    if (!canViewAll && ticket.customer._id.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const formattedTicket = formatTicketWithAgents(ticket);

    return NextResponse.json({ success: true, ticket: formattedTicket }, { status: 200 });
  } catch (error) {
    return checkForBanError(error);
  }
}

export async function PATCH(request: Request) {
  await dbConnect();
  const settingsResponse = await fetchSettings();
  if (settingsResponse?.find((setting: SiteSettingsType) => setting.key === "tickets-enabled")!.value === false) {
    return NextResponse.json({ message: "Tickets are currently disabled." });
  }
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
    const isAgentKey = body.updateKey === "agent";
    // If updateKey is agent, add this agent to the array if it exists.
    const value = (isAgentKey && ticket.agent) ? [...ticket.agent, body.newValue] : isAgentKey ? [body.newValue] : body.newValue;

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
    return checkForBanError(error);
  }
}