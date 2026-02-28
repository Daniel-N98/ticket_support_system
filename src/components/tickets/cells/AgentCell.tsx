import { UserCircle2Icon } from "lucide-react";

export function AgentCell({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <UserCircle2Icon size={28} className="text-blue-400" />
      <span>{name}</span>
    </div>
  );
}