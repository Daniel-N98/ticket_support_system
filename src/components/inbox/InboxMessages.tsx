"use client";

import { InboxMessages } from "@/types/Inbox";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";

interface InboxMessagesSectionProps {
  selectedInboxId: string | null;
  messages: InboxMessages[],
}

export default function InboxMessagesSection({ selectedInboxId, messages }: InboxMessagesSectionProps) {
  const { data: session } = useSession();

  const getFormattedDate = (updatedAt: string) => {
    const now = new Date();
    const date = new Date(updatedAt);
    if (now.toDateString() === date.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
      return date.toLocaleDateString();
    }
  }

  return (
    <div className="w-full flex flex-col h-[60vh] lg:h-[40vh] overflow-y-auto p-4 space-y-4">
      {!selectedInboxId && (
        <div className="flex items-center justify-center h-full text-white/50 italic">
          Select an inbox to view messages
        </div>
      )}

      {selectedInboxId && messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-white/50 italic">
          No messages in this inbox
        </div>
      )}

      {messages.map((message: InboxMessages) => {
        const isCurrentUser = message.authorId === session?.user.id;
        return (
          <div key={message.id} className={`flex gap-3 items-center ${isCurrentUser ? "justify-end" : "justify-start"}`}>
            {!isCurrentUser && (
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white/50" />
              </div>
            )}

            <div className={`p-4 rounded-lg max-w-[70%] wrap-break-wrd ${isCurrentUser ? "bg-blue-500 text-white self-end" : "bg-white/10 text-white"}`}>
              <div className="flex justify-between items-center mb-1 gap-3">
                <span className="text-white/90 font-medium text-sm">{isCurrentUser ? "You" : message.author}</span>
                <span className="text-white/50 text-xs">
                  {getFormattedDate(message.createdAt)}
                </span>
              </div>
              <div
                className="ticket-content wrap-break-word text-xs max-w-96"
                dangerouslySetInnerHTML={{ __html: message.content }}
              />
            </div>

            {isCurrentUser && (
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white/50" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  )
}