import { SiteSettingsType } from "@/types/SiteSettings";
import apiClient from "../api";
import toast from "react-hot-toast";

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
    const response: { message: string, success: boolean } = await apiClient.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/sitesettings`, { settings }, { headers: { "x-internal-secret": process.env.INTERNAL_API_SECRET! } });
    if (response.message) {
      toast.error(response.message);
    }
    return response.success;
  } catch (error) {
    return false;
  }
}

export async function updateSettings({ settings }: { settings: SiteSettingsType[] }): Promise<boolean> {
  try {
    const response: { message: string, success: boolean } = await apiClient.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/sitesettings`, { settings });
    if (response.message) {
      toast.error(response.message);
    }
    return response.success;
  } catch (error) {
    return false;
  }
}