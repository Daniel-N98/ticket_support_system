"use client";

import { fetchInbox, fetchInboxMessagesById, postInbox, postInboxMessage } from "@/lib/api/inbox.api";
import { Inbox, InboxMessages } from "@/types/Inbox";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useInbox(to?: string | null) {
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [selectedInboxId, setSelectedInboxId] = useState<string | null>(null);
  const [messages, setMessages] = useState<InboxMessages[]>([]);
  const [newReply, setNewReply] = useState<string>("");
  const [loadingInboxes, setLoadingInboxes] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const activeInboxRequestRef = useRef<string | null>(null);

  const loadSelectedInbox = useCallback(async (inboxId: string) => {
    activeInboxRequestRef.current = inboxId;
    setLoadingMessages(true);
    setSelectedInboxId(inboxId);

    const response = await fetchInboxMessagesById({ inboxId });

    if (activeInboxRequestRef.current === inboxId) {
      setMessages(response || []);
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    async function loadInbox() {
      setLoadingInboxes(true);
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
      setLoadingInboxes(false);
    }
    loadInbox();
  }, [to, loadSelectedInbox]);

  async function sendReply() {
    if (newReply.length < 1 || !selectedInboxId) return;
    setSendingReply(true);
    const inboxMessageResponse: InboxMessages | null = await postInboxMessage({ inboxId: selectedInboxId, message: newReply });
    if (inboxMessageResponse) {
      setMessages((previous) => [...previous, inboxMessageResponse]);
      setNewReply("");
      setInboxes((prev) => {
        const updated = prev.map((inbox) => inbox.id === selectedInboxId ? { ...inbox, updatedAt: new Date().toISOString() } : inbox);
        return [...updated].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      });
    }
    setSendingReply(false);
  }

  return {
    inboxes,
    selectedInboxId,
    messages,
    loadingInboxes,
    loadingMessages,
    sendingReply,
    sendReply,
    newReply,
    setNewReply,
    setSelectedInboxId,
    loadSelectedInbox,
  };
}