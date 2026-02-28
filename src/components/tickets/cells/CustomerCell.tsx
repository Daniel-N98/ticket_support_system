import { UserCircle2Icon } from "lucide-react";

type Props = {
  name: string;
  email: string;
  image?: string | null;
};

export function CustomerCell({ name, email }: Props) {
  return (
    <div className="flex items-center gap-2">
      <UserCircle2Icon size={32} className="text-blue-400" />
      <div className="leading-tight">
        <p className="text-white/90">{name}</p>
        <p className="text-xs text-white/50">{email}</p>
      </div>
    </div>
  );
}