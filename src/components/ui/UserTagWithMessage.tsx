"use client";

import { Mail, Send } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserTagWithMessageProps {
  customerId: string;
  customerName: string;
  customerEmail: string;
}
export default function UserTagWithMessage({ customerId, customerName, customerEmail }: UserTagWithMessageProps) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold uppercase">
          {customerName.charAt(0)}
        </div>
        <div>
          <div className="flex gap-x-2 items-center hover:text-blue-400 hover:cursor-pointer" onClick={() => router.push(`/dashboard/inbox?to=${customerId}`)}>
            <p className="text-sm font-medium">{customerName}</p>
            <Send className="w-4 h-4" />
          </div>
          <p className="text-xs text-white/40 flex items-center gap-1">
            <Mail className="w-3 h-3" /> {customerEmail}
          </p>
        </div>
      </div>
    </div>
  )
}