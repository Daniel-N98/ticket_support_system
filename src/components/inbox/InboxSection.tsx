"use client";

import { fetchInbox, fetchInboxMessagesById, postInboxMessage } from "@/lib/api/inbox.api";
import { Inbox, InboxMessages } from "@/types/Inbox";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import InboxList from "./Inbox";
import InboxMessagesSection from "./InboxMessages";
import TiptapEditor from "../editor/TiptapEditor";
import { Button } from "../ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function InboxSection() {
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [selectedInboxId, setSelectedInboxId] = useState<string | null>(null);
  const [messages, setMessages] = useState<InboxMessages[]>([]);
  const [loading, setLoading] = useState(false);
  const [newReply, setNewReply] = useState<string | null>(null);

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

  async function sendReply() {
    if ((!newReply || newReply.length < 1) || !selectedInboxId) return;
    const inboxMessageResponse: InboxMessages | null = await postInboxMessage({ inboxId: selectedInboxId, message: newReply });
    console.log(inboxMessageResponse);
    if (inboxMessageResponse) {
      setMessages([...messages, inboxMessageResponse]);
      setNewReply("");
    }
  }

  const handleBackToList = () => setSelectedInboxId(null);

  return (
    <section className="flex h-[120vh] lg:h-[78vh] w-full border border-white/10 rounded-xl overflow-hidden">

      <div className={`${selectedInboxId ? "hidden w-full xl:w-0 xl:flex" : "flex"} xl:w-1/3 w-full border-r border-white/10 shrink-0`}>
        <ScrollArea className={`${selectedInboxId ? "hidden xl:flex" : "flex"} h-full w-full`}>
          <InboxList inboxes={[...inboxes, ...inboxes, ...inboxes, ...inboxes, ...inboxes, ...inboxes, ...inboxes]} selectedInboxId={selectedInboxId} loadSelectedInbox={loadSelectedInbox} />
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
              <InboxMessagesSection selectedInboxId={selectedInboxId} messages={messages} />
            </div>
            <div className="flex flex-col gap-2 mt-8 px-4 w-full">
              <TiptapEditor value={newReply || ""} onChange={setNewReply} />
              <div className="flex justify-end">
                <Button className="w-max bg-blue-500 hover:bg-blue-600 mb-3 mt-1 md:mt-3 hover:cursor-pointer" onClick={() => sendReply()}>
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