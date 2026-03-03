import TeamContent from "@/components/team/TeamContent";
import TeamHeader from "@/components/team/TeamHeader";

export default function TeamPage() {

  return (
    <div>
      <TeamHeader placeholder="Search by team member name." />
      <section className="w-full min-h-187.5 bg-main-secondary mt-6 rounded-lg border border-white/10">
        <TeamContent type="team" />
      </section>
    </div>
  )
}