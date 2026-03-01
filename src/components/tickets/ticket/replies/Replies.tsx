import { Reply } from "./RepliesSection";

export default function Replies({ replies }: {replies: Reply[]}) {

  return (
    <>
      {replies.map((reply: Reply) => (
        <div key={reply.id} className="bg-white/5 rounded-md p-4 flex flex-col space-y-2">
          <div className="flex justify-between items-center text-white/60 text-xs">
            <span>{reply.author}</span>
            <span>{new Date(reply.createdAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</span>
          </div>
          <p className="text-sm text-white/80">{reply.content}</p>
        </div>
      ))}
    </>
  )
}