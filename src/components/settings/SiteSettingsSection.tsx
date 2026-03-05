"use client";

import { SETTINGS_SCHEMA } from "@/types/SiteSettings";
import { Card } from "@/components/ui/card";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useSettings from "@/app/hooks/useSettings";

export default function SiteSettingsSection() {

  const { siteLockdown,
    siteIsAlreadyLockedDown,
    settingChanges,
    toggleSetting,
    saveSettings,
    changeMade,
    loading,
    saving }
    = useSettings();

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
        <h2 className="text-lg font-semibold text-white">Site Settings</h2>
        <div className="space-x-4 flex items-center">
          <Button variant="destructive" className="font-bold tracking-wide flex items-center gap-2" disabled={siteIsAlreadyLockedDown || saving} onClick={siteLockdown}>
            {siteIsAlreadyLockedDown ? "Site Locked Down" : "Initiate Site Lockdown"}
          </Button>
          <Button className={`px-4 py-2 rounded-md font-medium text-sm transition ${saving ? "opacity-60 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} onClick={() => saveSettings(settingChanges)} disabled={saving || !changeMade}>
            {saving ? "Saving…" : "Save Settings"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading && SETTINGS_SKELETON}
        {settingChanges.map((setting, index) => (
          <Card key={setting.key} className="bg-main-secondary border-white/10 flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">{setting.name}</p>
              <p className={`text-xs ${setting.value ? "text-green-400" : "text-red-400"}`}>{setting.value ? "Enabled" : "Disabled"}</p>
            </div>
            <Switch
              checked={setting.value}
              onCheckedChange={() => toggleSetting(index)}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

const SETTINGS_SKELETON = (
  Object.keys(SETTINGS_SCHEMA).map((key) => (
    <Card
      key={key}
      className="bg-main-secondary border-white/10 flex items-center justify-between px-4 py-3 animate-pulse"
    >
      <div className="space-y-2">
        <div className="h-4 w-40 bg-white/10 rounded" />
        <div className="h-3 w-24 bg-white/5 rounded" />
      </div>

      <div className="h-6 w-11 rounded-full bg-white/10" />
    </Card>
  ))
);