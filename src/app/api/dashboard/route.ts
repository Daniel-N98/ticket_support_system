import dbConnect from "@/lib/mongodb";
import { checkForBanError, hasPermission } from "@/lib/permissionUtils";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import { DashboardStatsType } from "@/types/Dashboard";
import { PERMISSIONS } from "@/types/Permissions";
import { TicketType } from "@/types/Ticket";
import { UserType } from "@/types/User";
import { NextResponse } from "next/server";

export async function GET() {
  const permitted = await hasPermission(PERMISSIONS.DASHBOARD_VIEW);
  if (!permitted) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
  }

  try {

    await dbConnect();
    // Fetch tickets and users
    const tickets = (await Ticket.find({}).populate("customer", "email image name").lean()) || [];
    const users = (await User.find({}).populate("role", "name").lean()) || [];

    const dashboardStats = formatStats({ tickets, users });

    return NextResponse.json({ success: true, dashboardStats }, { status: 200 });
  } catch (error) {
    return checkForBanError(error);
  }
}

const formatStats = ({ tickets, users }: { tickets: TicketType[], users: User[] }): DashboardStatsType => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  return {
    users: (users.filter((user: User) => user.role.name !== "Admin" && user.role.name !== "Agent")).length,
    agents: users.filter((user: User) => user.role.name === "Agent").length,
    admins: users.filter((user: User) => user.role.name === "Admin").length,
    newUsersThisWeek: users.filter((user: User) => new Date(user.createdAt) >= sevenDaysAgo).length,
    avgResponseTimeMinutes: 131,

    tickets: {
      total: tickets.length,
      pending: tickets.filter((ticket: TicketType) => ticket.status === "Pending").length,
      open: tickets.filter((ticket: TicketType) => ticket.status === "Open").length,
      closed: tickets.filter((ticket: TicketType) => ticket.status === "Closed").length,
      today: tickets.filter((ticket: TicketType) => new Date(ticket.createdAt) >= startOfDay).length,
      week: tickets.filter((ticket: TicketType) => new Date(ticket.createdAt) >= sevenDaysAgo).length,
    }
  }
};

interface User extends Omit<UserType, "role"> {
  role: {
    name: string;
  }
}