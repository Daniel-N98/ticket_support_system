"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send, Flag } from "lucide-react";
import SpinningLoadingIcon from "@/components/ui/SpinningLoadingIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PriorityType } from "@/types/Ticket";
import TiptapEditor from "@/components/editor/TiptapEditor";

interface NewTicketFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  loading: boolean;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function NewTicketForm({ handleSubmit, content, setContent, loading }: NewTicketFormProps) {
  const [priority, setPriority] = useState<PriorityType>("Low");

  const router = useRouter();

  const priorityColors = {
    Low: "text-green-400",
    Medium: "text-yellow-400",
    High: "text-orange-400",
    Urgent: "text-red-400",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="subject" className="text-white/90 text-sm font-semibold flex items-center gap-2">
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Briefly describe the topic..."
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:ring-blue-500/50 transition-all h-11"
          disabled={loading}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content" className="text-white/90 text-sm font-semibold">
          Detailed Description
        </Label>
        <TiptapEditor value={content} onChange={setContent} />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
        <div className="grid gap-2">
          <Label htmlFor="priority" className="text-white/90 text-sm font-semibold flex items-center gap-2">
            <Flag className="w-4 h-4 text-blue-400" /> Priority Level
          </Label>
          <Select value={priority} name="priority" onValueChange={(val) => setPriority(val as typeof priority)} disabled={loading}>
            <SelectTrigger className={`bg-white/5 border-white/10 text-white w-full md:w-48 h-11 focus:ring-blue-500/50 ${priorityColors[priority]}`}>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
              <SelectItem value="Low" className={`${priorityColors["Low"]}`}>Low</SelectItem>
              <SelectItem value="Medium" className={`${priorityColors["Medium"]}`}>Medium</SelectItem>
              <SelectItem value="High" className={`${priorityColors["High"]}`}>High</SelectItem>
              <SelectItem value="Urgent" className={`${priorityColors["Urgent"]}`}>Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between md:justify-normal items-center gap-2 *:hover:cursor-pointer">
          <Button className="text-white/60 hover:text-white hover:bg-white/5" onClick={() => { router.replace("/dashboard/tickets") }} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-11 font-medium shadow-lg shadow-blue-900/20 flex items-center gap-2" disabled={loading}>
            <Send className="w-4 h-4" />
            Submit Ticket {loading && <SpinningLoadingIcon />}
          </Button>
        </div>
      </div>
    </form>
  )
}