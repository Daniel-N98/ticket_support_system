import TeamContent from "@/components/team/TeamContent";
import TeamHeader from "@/components/team/TeamHeader";

export default function TeamPage() {

  return (
    <div>
      <TeamHeader />
      <section className="w-full min-h-187.5 bg-main-secondary mt-6 rounded-lg">
        <TeamContent />
      </section>
    </div>
  )
}