import { updateSettings } from "@/lib/api/siteSettings.api";
import { loadSiteSettings } from "@/lib/siteSettings";
import { SiteSettingsType } from "@/types/SiteSettings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useSettings() {
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

  // Toggle a setting locally
  function toggleSetting(index: number) {
    const updatedSettings = [...settingChanges];
    updatedSettings[index].value = !updatedSettings[index].value;
    setSettingChanges(updatedSettings);

    const isChanged = updatedSettings.some((setting, i) => setting.value !== settings[i].value);

    setChangeMade(isChanged);
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

  return {
    siteLockdown,
    siteIsAlreadyLockedDown,
    settingChanges,
    toggleSetting,
    saveSettings,
    changeMade,
    loading,
    saving
  }
}