"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InboxButton({ iconClasses, hasNotification = false }: { iconClasses: string, hasNotification?: boolean }) {
  const router = useRouter();
  return (
    <button className={`group relative w-10 h-10 p-0 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors ${iconClasses}`} aria-label="Inbox" onClick={() => router.push("/dashboard/inbox")}>
      <Mail size="24" className="text-white group-hover:text-blue-400 transition-colors" />
      {hasNotification && (
        <span className="absolute top-2 right-2 block w-1.5 h-1.5 rounded-full bg-red-500" />
      )}
    </button>
  )
}