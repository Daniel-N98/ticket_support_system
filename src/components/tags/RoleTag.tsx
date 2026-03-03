export type RoleTagType = "User" | "Agent" | "Admin";

const ROLE_STYLES: Record<RoleTagType, string> = {
  User: "bg-gray-500/15 text-gray-300 border-gray-500/30",
  Agent: "bg-green-500/15 text-green-300 border-green-500/30",
  Admin: "bg-red-500/15 text-red-300 border-red-500/30",
};

export default function RoleTag({ role }: { role: RoleTagType }) {
  return (
    <span
      className={`
        ${ROLE_STYLES[role]} inline-flex items-center px-2 py-1 rounded-sm border text-[10px] lg:text-xs tracking-wide whitespace-nowrap`}>
      {role}
    </span>
  );
}