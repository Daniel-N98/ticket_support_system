"use client";

import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserTagWithMessageProps {
  customerId: string;
  customerName: string;
  children?: React.ReactNode;
}
export default function UserTagWithMessage({ customerId, customerName, children }: UserTagWithMessageProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const sessionIdMatchesCustomerId = session?.user.id === customerId;

  const getNameClasses = () => {
    if (sessionIdMatchesCustomerId) return "";
    return "hover:text-blue-400 hover:cursor-pointer"
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold uppercase">
          {customerName.charAt(0)}
        </div>
        <div>
          <div className={`flex gap-x-2 items-center ${getNameClasses()}`} onClick={() => !sessionIdMatchesCustomerId ? router.push(`/dashboard/inbox?to=${customerId}`) : {}}>
            <p className="text-sm font-medium">{customerName}</p>
            {!sessionIdMatchesCustomerId && <Send className="w-4 h-4" />}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}