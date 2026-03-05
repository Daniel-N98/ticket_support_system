import { Inbox } from "@/types/Inbox";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { UserIcon } from "lucide-react";

interface InboxListProps {
  inboxes: Inbox[];
  selectedInboxId: string | null;
  loadSelectedInbox: (inboxId: string) => void;
  loading: boolean;
  currentUserId: string | null;
}

export default function InboxList({ inboxes, selectedInboxId, loadSelectedInbox, loading, currentUserId }: InboxListProps) {
  dayjs.extend(relativeTime);

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-white font-semibold text-lg">Messages</h2>
      </div>
      {loading ? INBOX_LIST_SKELETON : <>
        {inboxes.length > 0 ? (
          <div className="flex flex-col">
            {inboxes.map((inbox: Inbox) => {
              const isSelected = selectedInboxId === inbox.id;
              const displayNames = inbox.users.map((u) => currentUserId !== u.id && u.name);

              return (
                <button key={inbox.id} onClick={() => !isSelected ? loadSelectedInbox(inbox.id!) : {}} className={`flex items-center gap-4 p-4 transition-all text-left outline-none border-l-2 ${isSelected ? "bg-white/10 border-blue-500" : "border-transparent hover:bg-white/5 hover:cursor-pointer"}`}>
                  <div className="relative shrink-0">
                    <div className="flex -space-x-3">
                      {inbox.users.map((user, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0a0a0a] bg-blue-400 flex items-center justify-center relative">
                          <div className="bg-white/5 w-full h-full flex items-center justify-center">
                            <span className="text-[14px] text-white font-bold">
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
                      <span className="text-sm">{dayjs(inbox.updatedAt).fromNow()}</span>
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
      </>}
    </div>
  );
}

const INBOX_LIST_SKELETON = (
  <div className="flex flex-col">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 border-l-2 border-transparent animate-pulse">
        <div className="flex -space-x-3 shrink-0">
          {[0, 1].map((idx) => (
            <div key={idx} className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#0a0a0a]" />
          ))}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-40 bg-white/10 rounded" />
            <div className="h-4 w-16 bg-white/5 rounded" />
          </div>
          <div className="h-3 w-56 bg-white/5 rounded" />
        </div>
      </div>
    ))}
  </div>
);