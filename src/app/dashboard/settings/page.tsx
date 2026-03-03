import SiteSettingsSection from "@/components/settings/SiteSettingsSection";

export default function SettingsPage() {

  return <div>
    <div className="h-12" />
    <section className="w-full min-h-187.5 bg-main-secondary mt-9 rounded-lg border border-white/10">
      <SiteSettingsSection />
    </section>
  </div>
}