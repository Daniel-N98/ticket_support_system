import { SiteSettingsType } from "@/types/SiteSettings";
import apiClient from "../api";

export async function fetchSettings(): Promise<SiteSettingsType[] | null> {
  try {
    const response: { message: string, settings: SiteSettingsType[] } = await apiClient.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/sitesettings`);
    return response.settings || null;
  } catch (error) {
    return null;
  }
}

export async function postSettings({ settings }: { settings: SiteSettingsType[] }): Promise<boolean> {
  try {
    const response: { success: boolean } = await apiClient.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/sitesettings`, { settings }, { headers: { "x-internal-secret": process.env.INTERNAL_API_SECRET! } });
    return response.success;
  } catch (error) {
    return false;
  }
}