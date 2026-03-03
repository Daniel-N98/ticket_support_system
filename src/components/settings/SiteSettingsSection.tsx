"use client";

import { useEffect, useState } from "react";
import { SiteSettingsType } from "@/types/SiteSettings";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Switch } from "../ui/switch";
import { loadSiteSettings } from "@/lib/siteSettings";
import { Button } from "../ui/button";
import { updateSettings } from "@/lib/api/siteSettings.api";
import { useRouter } from "next/navigation";

export default function SiteSettingsSection() {
  const [settings, setSettings] = useState<SiteSettingsType[]>([]);
  const [settingChanges, setSettingChanges] = useState<SiteSettingsType[]>([]);
  const [changeMade, setChangeMade] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      const response = await loadSiteSettings();
      if (response) {
        setSettings(response);
        setSettingChanges(response.map(setting => ({ ...setting })));
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  if (loading) return <p className="text-white text-sm">Loading settings...</p>;

  // Toggle a setting locally
  function toggleSetting(index: number) {
    const updatedSettings = [...settingChanges];
    updatedSettings[index].value = !updatedSettings[index].value;
    setSettingChanges(updatedSettings);
    setChangeMade(true);
  }

  async function siteLockdown() {
    if (!confirm("Are you sure you want to lock down the site? (Disables all settings)")) return;
    const updatedSettings = settingChanges.map(setting => ({
      ...setting,
      value: false,
    }));
    await saveSettings(updatedSettings);
  }

  // Save all settings to server
  async function saveSettings(forceSettings: SiteSettingsType[]) {
    setSaving(true);
    const success = await updateSettings({ settings: forceSettings });
    if (success) {
      toast.success("Settings updated successfully!");
      setSettings(forceSettings);
      setSettingChanges(forceSettings.map(setting => ({ ...setting })));
      router.refresh();
    }
    setSaving(false);
    setChangeMade(false);
  }

  const siteIsAlreadyLockedDown = settings.every(
    (setting) => setting.value === false
  );

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
        {settingChanges.map((setting, index) => (
          <Card key={setting.key} className="bg-main-secondary border-white/10 flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">{setting.name}</p>
              <p className="text-xs text-white/50">{setting.value ? "Enabled" : "Disabled"}</p>
            </div>
            <Switch
              checked={setting.value}
              onCheckedChange={() => toggleSetting(index)}
              className="data-[state=checked]:bg-blue-500"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}