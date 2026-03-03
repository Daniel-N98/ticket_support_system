import { UserCircle2Icon } from "lucide-react";

type Props = {
  name: string;
  email: string;
  image?: string | null;
};

export function CustomerCell({ name, email }: Props) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-7 h-7 shrink-0 flex items-center justify-center">
        <UserCircle2Icon className="w-7 h-7 text-blue-400" />
      </div>

      <div className="min-w-0 leading-tight">
        <p className="truncate text-white/90 text-sm font-medium">{name}</p>
        <p className="truncate text-xs text-white/50">{email}</p>
      </div>
    </div>
  );
}