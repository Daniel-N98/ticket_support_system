"use client";

import { useRouter } from "next/navigation";
import MainTableBody from "../../tables/TableBody";
import TableHeaders from "../../tables/TableHeader";
import { Card, CardContent } from "../../ui/card";
import { Table, TableCell, TableRow } from "../../ui/table";
import { useEffect, useState } from "react";
import { fetchTickets } from "@/lib/api/ticket.api";
import { TicketType } from "@/types/Ticket";
import { COLUMNS } from "@/features/tickets/table/utils";



export default function TicketsTable() {
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    async function loadTickets() {
      const ticketResponse: TicketType[] | null = await fetchTickets();
      if (ticketResponse) setTickets(ticketResponse);
    }
    loadTickets();
  }, []);

  return (
    <Card className="bg-main-secondary hover:bg-inherit border-b-0 pl-0 md:pl-8">
      <CardContent>
        <Table className="min-w-162.5 hover:bg-inherit mt-4 text-nowrap">
          <TableHeaders rows={COLUMNS.map(c => c.header)} />
          <TableBody data={tickets} router={router} />
        </Table>
      </CardContent>
    </Card>
  )
}

const TableBody = ({ data, router }: { data: TicketType[], router: ReturnType<typeof useRouter> }) => {

  return (
    <MainTableBody>
      {data.map((row) => (
        <TableRow key={row.ticketId} className="hover:bg-zinc-700 hover:cursor-pointer" onClick={() => router.push(`/dashboard/tickets/${row.ticketId.replace("#", "")}`)}>
          {COLUMNS.map(({ key, render }) => (
            <TableCell key={key} className="border-b border-b-black/70 text-white/80 py-4">
              {render(row)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MainTableBody>
  )
}
