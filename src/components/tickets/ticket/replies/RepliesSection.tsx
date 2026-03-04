"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import ReplyBox from "./ReplyBox";
import Replies from "./Replies";
import { TicketReplyType } from "@/types/TicketReply";
import { fetchTicketReplies, postTicketReply } from "@/lib/api/ticketReply.api";
import SpinningLoadingIcon from "@/components/ui/SpinningLoadingIcon";
import { TicketType } from "@/types/Ticket";

interface RepliesSectionProps {
  ticketId: string;
  setTicket: React.Dispatch<React.SetStateAction<TicketType | null>>;
  status: string;
}
export default function RepliesSection({ ticketId, setTicket, status }: RepliesSectionProps) {
  const [replies, setReplies] = useState<TicketReplyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [newReply, setNewReply] = useState("");

  useEffect(() => {
    async function loadReplies() {
      setLoading(true);
      const repliesResponse = await fetchTicketReplies(ticketId);
      if (repliesResponse) setReplies(repliesResponse);
      setLoading(false);
    }
    loadReplies();
  }, [ticketId]);

  async function addReply() {
    if (!newReply.trim()) return;
    if (status === "Closed") return;
    
    const replyResponse = await postTicketReply({ ticketId, content: newReply });
    if (replyResponse) {
      setReplies([...replies, replyResponse.ticketReply]);
      setTicket(replyResponse.ticket);
      setNewReply("");
    }
  };

  return (
    <Card className="bg-main-secondary border-white/10 text-white w-full mt-6 flex flex-col">
      <CardHeader className="border-b border-white/5 text-lg font-semibold">Replies ({replies.length || 0})</CardHeader>
      <CardContent className="pt-6 space-y-4">
        {loading ? <SpinningLoadingIcon /> :
          <>
            <Replies replies={replies} />
            <ReplyBox newReply={newReply} setNewReply={setNewReply} addReply={addReply} status={status}/>
          </>
        }
      </CardContent>
    </Card>
  );
}