export type PriorityTagType = "Low" | "Medium" | "High" | "Urgent";

const PRIORITY_STYLES: Record<PriorityTagType, string> = {
  Low: "bg-green-500/15 text-green-300 border-green-500/30",
  Medium: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  High: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Urgent: "bg-red-500/15 text-red-400 border-red-500/40",
};

export default function PriorityTag({ priority }: { priority: PriorityTagType }) {
  return (
    <span
      className={`
        ${PRIORITY_STYLES[priority]} inline-flex items-center px-2 py-1 rounded-sm border text-[10px] lg:text-xs tracking-wide whitespace-nowrap`}>
      {priority}
    </span>
  );
}