"use client";

import { fetchInbox, fetchInboxMessagesById, postInbox, postInboxMessage } from "@/lib/api/inbox.api";
import { Inbox, InboxMessages } from "@/types/Inbox";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import InboxList from "./Inbox";
import InboxMessagesSection from "./InboxMessages";
import TiptapEditor from "../editor/TiptapEditor";
import { Button } from "../ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function InboxSection() {
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [selectedInboxId, setSelectedInboxId] = useState<string | null>(null);
  const [messages, setMessages] = useState<InboxMessages[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState<string | null>(null);
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const to = searchParams.get('to'); // If this exists (not null), then the user is attempting to start a new conversation.

  const loadSelectedInbox = useCallback(async (inboxId: string) => {
    const inboxMessagesResponse: InboxMessages[] | null = await fetchInboxMessagesById({ inboxId });
    if (inboxMessagesResponse) {
      setSelectedInboxId(inboxId);
      setMessages(inboxMessagesResponse);
    }
  }, []);

  useEffect(() => {
    async function loadInbox() {
      setLoading(true);
      // If an inbox create attempt is made, but fails - this will be set to the users id to find their inbox.
      let idOfUserInboxToLoad: string | null = null;
      if (to) {
        const newInboxResponse: Inbox | null = await postInbox({ users: [to] });
        if (!newInboxResponse) idOfUserInboxToLoad = to;
      }

      const inboxResponse: Inbox[] = await fetchInbox() || []; // Fetch all inboxes
      if (idOfUserInboxToLoad && inboxResponse.length > 0) {
        // Inbox attempt create failed. Attempt to load inbox.
        const foundInbox: Inbox | undefined = inboxResponse.find((inbox: Inbox) => inbox.users.some((user) => user.id === idOfUserInboxToLoad));
        if (foundInbox?.id) {
          setSelectedInboxId(foundInbox.id);
          loadSelectedInbox(foundInbox.id);
        }
      }
      setInboxes(inboxResponse);
      setLoading(false);
    }
    loadInbox();
  }, []);

  async function sendReply() {
    if ((!newReply || newReply.length < 1) || !selectedInboxId) return;
    const inboxMessageResponse: InboxMessages | null = await postInboxMessage({ inboxId: selectedInboxId, message: newReply });
    if (inboxMessageResponse) {
      setMessages([...messages, inboxMessageResponse]);
      setNewReply("");
    }
  }

  const handleBackToList = () => setSelectedInboxId(null);

  return (
    <section className="flex h-[120vh] lg:h-[78vh] w-full border border-white/10 rounded-lg overflow-hidden">

      <div className={`${selectedInboxId ? "hidden w-full xl:w-0 xl:flex" : "flex"} xl:w-1/3 w-full border-r border-white/10 shrink-0`}>
        <ScrollArea className={`${selectedInboxId ? "hidden xl:flex" : "flex"} h-full w-full`}>
          <InboxList inboxes={inboxes} selectedInboxId={selectedInboxId} loadSelectedInbox={loadSelectedInbox} loading={loading} currentUserId={session?.user.id || null} />
        </ScrollArea>
      </div>

      <div className={`${selectedInboxId ? "flex" : "hidden xl:flex"} flex-1 flex-col h-full w-1/3 xl:w-full`}>
        {selectedInboxId ? (
          <>
            <div className="flex items-center gap-2 p-4 border-b border-white/10 xl:hidden">
              <button onClick={handleBackToList} className="flex items-center gap-x-2 p-2 pr-4 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <ChevronLeft size={20} />
                <span className="text-sm font-medium text-white">Back to List</span>
              </button>
            </div>

            <div className="flex-1">
              <InboxMessagesSection selectedInboxId={selectedInboxId} messages={messages} loading={loading} />
            </div>
            <div className="flex flex-col gap-2 mt-8 px-4 w-full">
              <TiptapEditor value={newReply || ""} onChange={setNewReply} />
              <div className="flex justify-end">
                <Button className="w-max bg-blue-500 hover:bg-blue-600 mb-3 mt-1 md:mt-3 hover:cursor-pointer" onClick={() => sendReply()} disabled={loading}>
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