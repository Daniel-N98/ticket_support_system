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
import useSearch from "@/app/hooks/useSearch";



export default function TicketsTable() {
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { searchTerm } = useSearch();

  useEffect(() => {
    async function loadTickets() {
      const ticketResponse: TicketType[] | null = await fetchTickets();
      if (ticketResponse) {
        setTickets(ticketResponse);
        setFilteredTickets(ticketResponse);
      }
      setLoading(false);
    }
    loadTickets();
  }, []);

  useEffect(() => {
    function updateFiltered() {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredTickets(tickets.filter((ticket) => (
        ticket.customer.toLowerCase().includes(lowerSearch) ||
        ticket.customerEmail.toLowerCase().includes(lowerSearch) ||
        ticket.subject.toLowerCase().includes(lowerSearch) ||
        ticket.ticketId.toLowerCase().includes(lowerSearch)
      )));
    }
    updateFiltered();
  }, [searchTerm]);

  return (
    <Card className="bg-main-secondary hover:bg-inherit border-0 pl-0 md:pl-8">
      <CardContent>
        <Table className="min-w-162.5 hover:bg-inherit mt-4 text-nowrap table-fixed">
          <TableHeaders rows={COLUMNS.map(c => c.header)} />
          {loading ? TABLE_SKELETON : <TableBody data={filteredTickets} router={router} />}
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

const TABLE_SKELETON_ROWS = 6;

export const TABLE_SKELETON = (
  <MainTableBody>
    {Array.from({ length: TABLE_SKELETON_ROWS }).map((_, rowIndex) => (
      <TableRow key={rowIndex} className="animate-pulse">
        {COLUMNS.map((_, colIndex) => (
          <TableCell key={colIndex} className="border-b border-b-black/70 py-4">
            <div className="h-4 w-full bg-white/10 max-w-30 rounded" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </MainTableBody>
);