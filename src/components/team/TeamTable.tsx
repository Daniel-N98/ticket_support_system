"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { COLUMNS } from "@/features/team/table/utils";
import { Card, CardContent } from "../ui/card";
import TableHeaders from "../tables/TableHeader";
import MainTableBody from "../tables/TableBody";
import { Table, TableCell, TableRow } from "../ui/table";
import { UserType } from "@/types/User";
import { fetchUsers } from "@/lib/api/user.api";

export default function TeamTable({ type }: { type: string }) {
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    async function loadTickets() {
      const userResponse: UserType[] | null = await fetchUsers(type);
      if (userResponse) setUsers(userResponse);
    }
    loadTickets();
  }, []);

  return (
    <Card className="bg-main-secondary hover:bg-inherit border-b-0 pl-0 md:pl-8">
      <CardContent>
        <Table className="min-w-162.5 hover:bg-inherit mt-4 text-nowrap">
          <TableHeaders rows={COLUMNS.map(c => c.header)} />
          <TableBody data={users} router={router} />
        </Table>
      </CardContent>
    </Card>
  )
}

const TableBody = ({ data, router }: { data: UserType[], router: ReturnType<typeof useRouter> }) => {

  return (
    <MainTableBody>
      {data.map((row) => (
        <TableRow key={row.email} className="hover:bg-zinc-700 hover:cursor-pointer">
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
