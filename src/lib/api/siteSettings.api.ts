import { SiteSettingsType } from "@/types/SiteSettings";
import apiClient from "../api";

export async function fetchSettings(): Promise<SiteSettingsType[] | null> {
  try {
    const response: { message: string, settings: SiteSettingsType[] } = await apiClient.get("/site-settings");
    return response.settings;
  } catch (error) {
    return null;
  }
}

export async function postSettings({ settings }: { settings: SiteSettingsType[] }): Promise<boolean> {
  try {
    const response: { success: boolean } = await apiClient.post("/site-settings", { settings });
    return response.success;
  } catch (error) {
    return false;
  }
}