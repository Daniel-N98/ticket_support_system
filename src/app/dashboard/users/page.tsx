import TeamContent from "@/components/team/TeamContent";
import TeamHeader from "@/components/team/TeamHeader";

export default function UsersPage() {

  return (
    <div>
      <TeamHeader placeholder="Search by a user's name, or email."/>
      <section className="w-full min-h-187.5 bg-main-secondary mt-6 rounded-lg">
        <TeamContent type="all"/>
      </section>
    </div>
  )
}