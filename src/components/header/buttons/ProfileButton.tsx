import {  UserCircle2 } from "lucide-react";

export default function ProfileButton({ iconClasses }: { iconClasses: string }) {

  return (
    <button className={`group rounded-full ${iconClasses} w-12 h-12`} aria-label="Profile">
      <UserCircle2 size="30" className="text-white group-hover:text-blue-400 transition-colors" />
    </button>
  )
}