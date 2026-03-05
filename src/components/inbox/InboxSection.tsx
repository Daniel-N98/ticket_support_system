"use client";

import { ChevronLeft } from "lucide-react";
import InboxList from "./Inbox";
import InboxMessagesSection from "./InboxMessages";
import TiptapEditor from "../editor/TiptapEditor";
import { Button } from "../ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSession } from "next-auth/react";
import useInbox from "@/app/hooks/useInbox";
import { useSearchParams } from "next/navigation";

export default function InboxSection() {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const to = searchParams.get('to'); // If this exists (not null), then the user is attempting to start a new conversation.
  const { inboxes,
    selectedInboxId,
    messages,
    loadingInboxes,
    loadingMessages,
    sendingReply,
    sendReply,
    setSelectedInboxId,
    loadSelectedInbox,
    newReply,
    setNewReply
  } = useInbox(to);

  const handleBackToList = () => setSelectedInboxId(null);
  const isInboxSelected = Boolean(selectedInboxId);

  return (
    <section className="flex h-[120vh] lg:h-[78vh] w-full border border-white/10 rounded-lg overflow-hidden">

      <div className={`${isInboxSelected ? "hidden w-full xl:w-0 xl:flex" : "flex"} xl:w-1/3 w-full border-r border-white/10 shrink-0`}>
        <ScrollArea className={`${isInboxSelected ? "hidden xl:flex" : "flex"} h-full w-full`}>
          <InboxList inboxes={inboxes} selectedInboxId={selectedInboxId} loadSelectedInbox={loadSelectedInbox} loading={loadingInboxes} currentUserId={session?.user.id || null} />
        </ScrollArea>
      </div>

      <div className={`${isInboxSelected ? "flex" : "hidden xl:flex"} flex-1 flex-col h-full w-1/3 xl:w-full`}>
        {isInboxSelected ? (
          <>
            <div className="flex items-center gap-2 p-4 border-b border-white/10 xl:hidden">
              <button onClick={handleBackToList} className="flex items-center gap-x-2 p-2 pr-4 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <ChevronLeft size={20} />
                <span className="text-sm font-medium text-white">Back to List</span>
              </button>
            </div>

            <div className="flex-1">
              <InboxMessagesSection selectedInboxId={selectedInboxId} messages={messages} loading={loadingMessages} />
            </div>
            <div className="flex flex-col gap-2 mt-8 px-4 w-full">
              <TiptapEditor value={newReply} onChange={setNewReply} disabled={sendingReply} />
              <div className="flex justify-end">
                <Button className="w-max bg-blue-500 hover:bg-blue-600 mb-3 mt-1 md:mt-3 hover:cursor-pointer" onClick={() => sendReply()} disabled={sendingReply}>
                  Post Reply
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/20 italic">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </section>
  );
}