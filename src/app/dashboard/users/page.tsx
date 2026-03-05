import { SearchProvider } from "@/app/hooks/useSearch";
import TeamContent from "@/components/team/TeamContent";
import TeamHeader from "@/components/team/TeamHeader";

export default function UsersPage() {

  return (
    <div>
      <SearchProvider>
        <TeamHeader placeholder="Search by a user's name, or email." />
        <section className="w-full min-h-187.5 bg-main-secondary mt-6 rounded-lg border border-white/10">
          <TeamContent type="all" />
        </section>
      </SearchProvider>
    </div>
  )
}