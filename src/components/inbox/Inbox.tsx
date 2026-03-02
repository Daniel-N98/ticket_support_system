import { Inbox } from "@/types/Inbox";
import { UserIcon } from "lucide-react";

interface InboxListProps {
  inboxes: Inbox[];
  selectedInboxId: string | null;
  loadSelectedInbox: (inboxId: string) => void;
}

export default function InboxList({ inboxes, selectedInboxId, loadSelectedInbox }: InboxListProps) {

  const getFormattedDate = (updatedAt: string) => {
    const now = new Date();
    const date = new Date(updatedAt);
    if (now.toDateString() === date.toDateString()) {
      return "Today";
    } else {
      return date.toLocaleDateString();
    }
  }
  
  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-white font-semibold text-lg">Messages</h2>
      </div>

      {inboxes.length > 0 ? (
        <div className="flex flex-col">
          {inboxes.map((inbox: Inbox) => {
            const isSelected = selectedInboxId === inbox.id;
            const displayNames = inbox.users.map((u) => u.name).join(", ");

            return (
              <button key={inbox.id} onClick={() => loadSelectedInbox(inbox.id!)} className={`flex items-center gap-4 p-4 transition-all text-left hover:cursor-pointer outline-none border-l-2 ${isSelected ? "bg-white/10 border-blue-500" : "border-transparent hover:bg-white/5"}`}>
                <div className="relative shrink-0">
                  <div className="flex -space-x-3">
                    {inbox.users.map((user, idx) => (
                      <div key={idx} className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0a0a0a] bg-white/10 flex items-center justify-center relative">
                        <div className="bg-white/5 w-full h-full flex items-center justify-center">
                          <span className="text-[10px] text-white/50 font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}

                    {inbox.users.length > 2 && (
                      <div className="w-10 h-10 rounded-full bg-white/20 text-[10px] flex items-center justify-center text-white font-medium border-2 border-[#0a0a0a] z-10">
                        +{inbox.users.length - 2}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="truncate text-sm font-semibold text-white">
                      {displayNames}
                    </span>
                    <span className="text-sm">{getFormattedDate(inbox.updatedAt)}</span>
                  </div>

                  <p className="truncate text-xs text-white/50 leading-relaxed">
                    Click to view the conversation...
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <UserIcon className="w-8 h-8 text-white/10 mb-2" />
          <div className="text-white/40 text-sm italic">No inboxes available</div>
        </div>
      )}
    </div>
  );
}