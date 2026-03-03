import { SETTINGS_SCHEMA, SiteSettingsType } from "@/types/SiteSettings";
import { fetchSettings, postSettings } from "./api/siteSettings.api";

async function loadSiteSettings(): Promise<SiteSettingsType[]> {
  const settingsResponse = await fetchSettings();

  if (settingsResponse) return settingsResponse;

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
