"use client";

import { useEffect, useState } from "react";
import { SiteSettingsType } from "@/types/SiteSettings";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Switch } from "../ui/switch";
import { loadSiteSettings } from "@/lib/siteSettings";
import { Button } from "../ui/button";
import { updateSettings } from "@/lib/api/siteSettings.api";

export default function SiteSettingsSection() {
  const [settings, setSettings] = useState<SiteSettingsType[]>([]);
  const [changeMade, setChangeMade] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      const response = await loadSiteSettings();
      if (response) {
        setSettings(response);
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  if (loading) return <p className="text-white text-sm">Loading settings...</p>;

  // Toggle a setting locally
  function toggleSetting(index: number) {
    const updatedSettings = [...settings];
    updatedSettings[index].value = !updatedSettings[index].value;
    setSettings(updatedSettings);
    setChangeMade(true);
  }

  // Save all settings to server
  async function saveSettings() {
    setSaving(true);
    const success = await updateSettings({ settings });
    if (success) toast.success("Settings updated successfully!");
    setSaving(false);
    setChangeMade(false);
  }

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
      <div className="flex flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
        <h2 className="text-lg font-semibold text-white">Site Settings</h2>
        <Button
          className={`px-4 py-2 rounded-md font-medium text-sm transition ${saving ? "opacity-60 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          onClick={saveSettings}
          disabled={saving || !changeMade}
        >
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {settings.map((setting, index) => (
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