import { SETTINGS_SCHEMA, SiteSettingsType } from "@/types/SiteSettings";
import { fetchSettings, postSettings } from "./api/siteSettings.api";

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

let cachedSettings: SiteSettingsType[] | null = null;
let lastFetchedAt = 0;

export async function loadSiteSettings(): Promise<SiteSettingsType[]> {
  const now = Date.now();

  // Return cached settings if still valid
  if (cachedSettings && now - lastFetchedAt < CACHE_TTL_MS) {
    return cachedSettings;
  }

  // Fetch fresh settings
  const settingsResponse = await fetchSettings();

  if (settingsResponse) {
    cachedSettings = settingsResponse;
    lastFetchedAt = now;
    return settingsResponse;
  }
  // No settings exist in db, post and return default.
  await postSettings({ settings: DEFAULT_SETTINGS });
  return DEFAULT_SETTINGS;
}

const DEFAULT_SETTINGS: SiteSettingsType[] = Object.entries(SETTINGS_SCHEMA).map(
  ([key, name]) => ({
    key: key as SiteSettingsType["key"],
    name: name as SiteSettingsType["name"],
    value: false,
  })
);
