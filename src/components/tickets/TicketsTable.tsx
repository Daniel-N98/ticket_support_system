"use client";

import { useRouter } from "next/navigation";
import MainTableBody from "../tables/TableBody";
import TableHeaders from "../tables/TableHeader";
import { Card, CardContent } from "../ui/card";
import { Table, TableCell, TableRow } from "../ui/table";

export type Ticket = {
  id: string;
  customer: string;
  subject: string;
  status: "Open" | "Closed" | "Pending";
  priority: "Low" | "Medium" | "High";
  agent: string;
  date: string;
};

const COLUMNS: (keyof Ticket)[] = [
  "id",
  "customer",
  "subject",
  "status",
  "priority",
  "agent",
  "date",
];

const fakeData: Ticket[] = [
  {
    id: "#TK001",
    customer: "Alice Johnson",
    subject: "Cannot access account",
    status: "Open",
    priority: "High",
    agent: "John Doe",
    date: "2026-02-25",
  },
  {
    id: "#TK002",
    customer: "Bob Smith",
    subject: "Payment not going through",
    status: "Pending",
    priority: "Medium",
    agent: "Jane Roe",
    date: "2026-02-24",
  },
  {
    id: "#TK003",
    customer: "Charlie Brown",
    subject: "Bug in dashboard",
    status: "Closed",
    priority: "Low",
    agent: "Emily White",
    date: "2026-02-23",
  },
  {
    id: "#TK004",
    customer: "Diana Prince",
    subject: "Request refund",
    status: "Open",
    priority: "High",
    agent: "John Doe",
    date: "2026-02-22",
  },
  {
    id: "#TK005",
    customer: "Ethan Hunt",
    subject: "Feature request",
    status: "Pending",
    priority: "Medium",
    agent: "Jane Roe",
    date: "2026-02-21",
  },
];

const TABLE_ROWS = ["Ticket #", "Customer", "Subject", "Status", "Priority", "Agent", "Date"];

export default function TicketsTable() {
  const router = useRouter();

  return (
    <Card className="bg-main-secondary hover:bg-inherit border-b-0">
      <CardContent>
        <Table className="min-w-162.5 hover:bg-inherit mt-4">
          <TableHeaders rows={TABLE_ROWS} />
          <MainTableBody>
            {fakeData.map((row: Ticket) => (
              <TableRow key={row.id} className="hover:bg-zinc-700" onClick={() => router.push(`/dashboard/tickets/${row.id.replace("#", "")}`)}>
                {COLUMNS.map((key) => (
                  <TableCell key={key} className="border-b border-b-black/70 text-white/80 hover:text-white py-4 hover:cursor-pointer">
                    {row[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </MainTableBody>
        </Table>
      </CardContent>
    </Card>
  )
}