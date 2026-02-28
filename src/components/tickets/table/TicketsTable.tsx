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
import { Column, Ticket } from "@/types/Ticket";


const COLUMNS: Column<Ticket>[] = [
  {
    key: "id",
    header: "Ticket #",
    render: (row) => row.id,
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

const fakeData: Ticket[] = [
  {
    id: "#TK001",
    customer: "Alice Johnson",
    customerEmail: "AliceJohnson@gmail.com",
    customerImage: null,
    subject: "Cannot access account",
    status: "Open",
    priority: "Urgent",
    agent: "John Doe",
    createdAt: "2026-07-17T17:12:00Z",
  },
  {
    id: "#TK002",
    customer: "Bob Smith",
    customerEmail: "BobSmith@gmail.com",
    customerImage: null,
    subject: "Payment not going through",
    status: "Pending",
    priority: "Medium",
    agent: "Jane Roe",
    createdAt: "2026-07-17T17:12:00Z",
  },
  {
    id: "#TK003",
    customer: "Charlie Brown",
    customerEmail: "CharlieBrown@gmail.com",
    customerImage: null,
    subject: "Bug in dashboard",
    status: "Closed",
    priority: "Low",
    agent: "Emily White",
    createdAt: "2026-07-17T17:12:00Z",
  },
  {
    id: "#TK004",
    customer: "Diana Prince",
    customerEmail: "DianaPrince@gmail.com",
    customerImage: null,
    subject: "Request refund",
    status: "Open",
    priority: "High",
    agent: "John Doe",
    createdAt: "2026-07-17T17:12:00Z",
  },
  {
    id: "#TK005",
    customer: "Ethan Hunt",
    customerEmail: "EthanHunt@gmail.com",
    customerImage: null,
    subject: "Feature request",
    status: "Pending",
    priority: "Medium",
    agent: "Jane Roe",
    createdAt: "2026-07-17T17:12:00Z",
  },
];

export default function TicketsTable() {
  const router = useRouter();

  /*
    Ticket data will be retrieved based on the user. If they're a user > User's tickets. If they're an admin or agent > All tickets.
    Ticket rows will be based on the user. If they're a user > Columns without "Customer". If they're an admin or agent, with "Customer".
  */

  return (
    <Card className="bg-main-secondary hover:bg-inherit border-b-0 pl-0 md:pl-8">
      <CardContent>
        <Table className="min-w-162.5 hover:bg-inherit mt-4 text-nowrap">
          <TableHeaders rows={COLUMNS.map(c => c.header)} />
          <TableBody data={fakeData} router={router} />
        </Table>
      </CardContent>
    </Card>
  )
}

const TableBody = ({ data, router }: { data: Ticket[], router: ReturnType<typeof useRouter> }) => {

  return (
    <MainTableBody>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-zinc-700 hover:cursor-pointer" onClick={() => router.push(`/dashboard/tickets/${row.id.replace("#", "")}`)}>
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