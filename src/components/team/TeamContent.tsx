import TeamTable from "./TeamTable";

export default function TeamContent({ type }: { type: string }) {

  return (
    <div>
      <TeamTable type={type}/>
    </div>
  )
}