"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import ReplyBox from "./ReplyBox";
import Replies from "./Replies";

export interface Reply {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

const fakeReplies: Reply[] = [
  { id: "1", author: "Agent John", content: "We’re looking into this issue. We’re looking into this issue. We’re looking into this issue. We’re looking into this issue.", createdAt: "2026-03-01T10:00:00Z" },
  { id: "2", author: "Daniel N", content: "Thanks! Any updates?", createdAt: "2026-03-01T11:15:00Z" },
  { id: "3", author: "Agent Jane", content: "The issue has been resolved. Please check.", createdAt: "2026-03-01T12:30:00Z" },
];

export default function RepliesSection() {
  const [replies, setReplies] = useState<Reply[]>(fakeReplies);
  const [newReply, setNewReply] = useState("");

  const addReply = () => {
    if (!newReply.trim()) return;
    const reply: Reply = {
      id: (replies.length + 1).toString(),
      author: "Daniel Nee",
      content: newReply,
      createdAt: new Date().toISOString(),
    };
    setReplies([...replies, reply]);
    setNewReply("");
  };

  return (
    <Card className="bg-main-secondary border-white/10 text-white w-full mt-6 flex flex-col">
      <CardHeader className="border-b border-white/5 text-lg font-semibold">Replies</CardHeader>
      <CardContent className="pt-6 space-y-4">
        <Replies replies={replies} />
        <ReplyBox newReply={newReply} setNewReply={setNewReply} addReply={addReply} />
      </CardContent>
    </Card>
  );
}