export type DashboardStatsType = {
  users: number;
  agents: number;
  admins: number;
  newUsersThisWeek: number;
  avgResponseTimeMinutes: number;

  tickets: {
    total: number;
    pending: number;
    open: number;
    closed: number;
    today: number;
    week: number;
  }
}