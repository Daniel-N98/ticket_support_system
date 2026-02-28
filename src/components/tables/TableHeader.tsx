import { TableHead, TableHeader, TableRow } from "../ui/table";

export default function TableHeaders({rows}: {rows: string[]}) {

  return (
    <TableHeader>
      <TableRow className="hover:bg-inherit">
        {rows.map((row: string) => (
          <TableHead key={row} className="text-white/90">{row}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}