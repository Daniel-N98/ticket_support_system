import { DashboardStatsType } from "@/types/Dashboard";
import apiClient from "../api";
import { toastOrReturn } from "./util";

export async function fetchDashboardStats(): Promise<DashboardStatsType | null> {
  try {
    const response: { message: string, dashboardStats: DashboardStatsType } = await apiClient.get(`/dashboard`);
    return toastOrReturn(response.message, response.dashboardStats);
  } catch (error) {
    return null;
  }
}