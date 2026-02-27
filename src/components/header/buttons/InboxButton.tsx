"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InboxButton({ iconClasses }: { iconClasses: string }) {
  const router = useRouter();
  return (
    <button className={`group rounded-lg ${iconClasses} w-10 h-10`} aria-label="Inbox" onClick={() => router.push("/dashboard/inbox")}>
      <Mail size="24" className="text-white group-hover:text-blue-400 transition-colors" />
    </button>
  )
}