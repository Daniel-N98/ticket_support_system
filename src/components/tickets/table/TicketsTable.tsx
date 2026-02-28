"use client";

import { useRouter } from "next/navigation";
import MainTableBody from "../../tables/TableBody";
import TableHeaders from "../../tables/TableHeader";
import { Card, CardContent } from "../../ui/card";
import { Table, TableCell, TableRow } from "../../ui/table";
import PriorityTag from "../tags/PriorityTag";
import StatusTag from "../tags/StatusTag";
import { AgentCell } from "../cells/AgentCell";
import { CustomerCell } from "../cells/CustomerCell";
import { Column, TicketType } from "@/types/Ticket";
import { useEffect, useState } from "react";
import { fetchTickets } from "@/lib/api/ticket.api";


const COLUMNS: Column<TicketType>[] = [
  {
    key: "ticketId",
    header: "Ticket #",
    render: (row) => row.ticketId,
  },
  {
    key: "customer",
    header: "Customer",
    render: (row) => (
      <CustomerCell
        name={row.customer}
        email={row.customerEmail}
        image={row.customerImage}
      />
    ),
  },
  {
    key: "subject",
    header: "Subject",
    render: (row) => (
      <p className="font-medium text-white">
        {row.subject}
      </p>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusTag status={row.status} />,
  },
  {
    key: "priority",
    header: "Priority",
    render: (row) => <PriorityTag priority={row.priority} />,
  },
  {
    key: "agent",
    header: "Agent",
    render: (row) => <AgentCell name={row.agent} />,
  },
  {
    key: "createdAt",
    header: "Date",
    render: (row) => (
      <span className="text-white/60 text-sm">{new Date(row.createdAt).toLocaleDateString()}</span>
    ),
  },
];

export default function TicketsTable() {
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  /*
    Ticket data will be retrieved based on the user. If they're a user > User's tickets. If they're an admin or agent > All tickets.
    Ticket rows will be based on the user. If they're a user > Columns without "Customer". If they're an admin or agent, with "Customer".
  */

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