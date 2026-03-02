"use client";

import { fetchInbox, fetchInboxMessagesById } from "@/lib/api/inbox.api";
import { Inbox, InboxMessages } from "@/types/Inbox";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import InboxList from "./Inbox";
import InboxMessagesSection from "../InboxMessages";

export default function InboxSection() {
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [selectedInboxId, setSelectedInboxId] = useState<string | null>(null);
  const [messages, setMessages] = useState<InboxMessages[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadInbox() {
      const inboxResponse: Inbox[] | null = await fetchInbox();
      if (inboxResponse) setInboxes(inboxResponse);
    }
    loadInbox();
  }, []);

  async function loadSelectedInbox(inboxId: string) {
    setLoading(true);
    const inboxMessagesResponse: InboxMessages[] | null = await fetchInboxMessagesById({ inboxId });
    if (inboxMessagesResponse) {
      setSelectedInboxId(inboxId);
      setMessages(inboxMessagesResponse);
    }
    setLoading(false);
  }

  const handleBackToList = () => setSelectedInboxId(null);

  return (
    <section className="flex h-[78.5vh] w-full border border-white/10 rounded-xl overflow-hidden">

      <div className={`${selectedInboxId ? "hidden md:flex" : "flex"} w-full md:w-87.5 lg:w-1/3 h-full border-r border-white/10 shrink-0`}>
        <InboxList inboxes={inboxes} selectedInboxId={selectedInboxId} loadSelectedInbox={loadSelectedInbox} />
      </div>

      <div className={`${selectedInboxId ? "flex" : "hidden md:flex"} flex-1 flex-col h-full`}>
        {selectedInboxId ? (
          <>
            <div className="flex items-center gap-2 p-4 border-b border-white/10 md:hidden">
              <button onClick={handleBackToList} className="flex items-center gap-x-2 p-2 pr-4 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <ChevronLeft size={20} />
                <span className="text-sm font-medium text-white">Back to List</span>
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <InboxMessagesSection selectedInboxId={selectedInboxId} messages={messages} />
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