import { SETTINGS_SCHEMA, SiteSettingsType } from "@/types/SiteSettings";
import { fetchSettings, postSettings } from "./api/siteSettings.api";

export async function loadSiteSettings(): Promise<SiteSettingsType[]> {
  
  // Fetch fresh settings
  const settingsResponse = await fetchSettings();

  if (settingsResponse) {
    return settingsResponse;
  }
  // No settings exist in db, post and return default.
  await postSettings({ settings: DEFAULT_SETTINGS });
  return DEFAULT_SETTINGS;
}

export async function saveSiteSettings(settings: SiteSettingsType[]) {
  try {
    const success = await postSettings({ settings });
    return true;
  } catch (error) {
    console.error("Error saving settings:", error);
    return false;
  }
}

const DEFAULT_SETTINGS: SiteSettingsType[] = Object.entries(SETTINGS_SCHEMA).map(
  ([key, name]) => ({
    key: key as SiteSettingsType["key"],
    name: name as SiteSettingsType["name"],
    value: false,
  })
);
