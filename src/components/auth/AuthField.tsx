import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export function AuthField({
  id,
  label,
  type = "text",
  placeholder,
}: AuthFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-white/70">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="bg-main-primary border-gray-700 text-white placeholder:text-white/40 mt-2"
      />
    </div>
  );
}