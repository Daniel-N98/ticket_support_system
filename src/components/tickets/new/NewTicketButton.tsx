import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export default function NewTicketButton() {

  return (
    <Link href={"/dashboard/tickets/new"}>
      <Button className="w-max bg-blue-500 hover:bg-blue-600 mt-3 hover:cursor-pointer">
        <PlusSquare /> New
      </Button>
    </Link>
  )
}