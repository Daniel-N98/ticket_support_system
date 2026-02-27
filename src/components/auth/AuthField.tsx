import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  required = false
}: AuthFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-white/70">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        name={id}
        placeholder={placeholder}
        required={required}
        className="bg-main-primary border-gray-700 text-white placeholder:text-white/40 mt-2"
      />
    </div>
  );
}