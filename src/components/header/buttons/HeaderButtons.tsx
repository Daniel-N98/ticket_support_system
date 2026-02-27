import InboxButton from "./InboxButton";
import NotificationButton from "./NotificationButton";
import ProfileButton from "./ProfileButton";

export default function HeaderButtons() {
  const iconClasses = "bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center cursor-pointer";
  
  return (
    <div className="flex items-center gap-3">
      <NotificationButton iconClasses={iconClasses} />
      <InboxButton iconClasses={iconClasses} />
      <ProfileButton iconClasses={iconClasses} />
    </div>
  )
}