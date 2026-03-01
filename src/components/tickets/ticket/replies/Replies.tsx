import { TicketReplyType } from "@/types/TicketReply";
import { UserCircle2Icon } from "lucide-react";

export default function Replies({ replies }: { replies: TicketReplyType[] }) {

  return (
    <>
      {replies.map((reply: TicketReplyType) => (
        <div key={reply._id} className="bg-white/5 rounded-md p-4 flex flex-col space-y-2">
          <div className="flex justify-between items-center text-white/60 text-xs">
            <div className="flex items-center gap-x-2">
              <UserCircle2Icon size={22} className="text-blue-400" /> {reply.author}
            </div>
            <span>{new Date(reply.createdAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</span>
          </div>
          <div className="ticket-content wrap-break-word" dangerouslySetInnerHTML={{ __html: reply.content }} />
        </div>
      ))}
    </>
  )
}