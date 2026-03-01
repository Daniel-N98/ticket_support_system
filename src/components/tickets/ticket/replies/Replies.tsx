import { TickerReplyType } from "@/types/TicketReply";

export default function Replies({ replies }: { replies: TickerReplyType[] }) {

  return (
    <>
      {replies.map((reply: TickerReplyType) => (
        <div key={reply.id} className="bg-white/5 rounded-md p-4 flex flex-col space-y-2">
          <div className="flex justify-between items-center text-white/60 text-xs">
            <span>{reply.author}</span>
            <span>{new Date(reply.createdAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</span>
          </div>
          <div
            className="ticket-content"
            dangerouslySetInnerHTML={{ __html: reply.content }}
          />
        </div>
      ))}
    </>
  )
}