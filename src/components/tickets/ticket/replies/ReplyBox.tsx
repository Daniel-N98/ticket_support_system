import TiptapEditor from "@/components/editor/TiptapEditor";
import { Button } from "@/components/ui/button";

interface ReplyBoxProps {
  newReply: string;
  setNewReply: (value: string) => void;
  addReply: () => void;
}

export default function ReplyBox({ newReply, setNewReply, addReply }: ReplyBoxProps) {

  return (
    <div className="flex flex-col gap-2 mt-8">
      <TiptapEditor value={newReply} onChange={setNewReply} />
      <div className="flex justify-end">
        <Button className="w-max bg-blue-500 hover:bg-blue-600 mt-3 hover:cursor-pointer" onClick={addReply}>
          Post Reply
        </Button>
      </div>
    </div>
  )
}