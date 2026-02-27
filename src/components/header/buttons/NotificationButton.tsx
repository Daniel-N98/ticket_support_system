import { Bell } from "lucide-react";

export default function NotificationButton({ iconClasses }: { iconClasses: string }) {

  return (
    <button className={`group rounded-lg ${iconClasses} w-10 h-10`} aria-label="Notifications">
      <Bell size="24" className="text-white group-hover:text-blue-400 transition-colors" />
    </button>
  )
}