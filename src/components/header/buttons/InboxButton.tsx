import { Mail } from "lucide-react";

export default function InboxButton({ iconClasses }: { iconClasses: string }) {

  return (
    <button className={`group rounded-lg ${iconClasses} w-10 h-10`} aria-label="Profile">
      <Mail size="24" className="text-white group-hover:text-blue-400 transition-colors" />
    </button>
  )
}