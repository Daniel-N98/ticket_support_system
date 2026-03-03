import { UserStatus } from "@/types/User";

export type StatusTagType = "Open" | "In Progress" | "Pending" | "Resolved" | "Closed";

const STATUS_STYLES: Record<StatusTagType | UserStatus, string> = {
  Open: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "In Progress": "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Pending: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Resolved: "bg-green-500/15 text-green-300 border-green-500/30",
  Closed: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
  active: "bg-green-500/15 text-green-300 border-green-500/30",
  banned: "bg-red-500/15 text-red-300 border-red-500/30",
};

export default function StatusTag({ status }: { status: StatusTagType | UserStatus }) {
  return (
    <span
      className={`
        ${STATUS_STYLES[status]} inline-flex items-center px-2 py-1 gap-2 rounded-sm border text-[10px] lg:text-xs tracking-wide whitespace-nowrap`}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}