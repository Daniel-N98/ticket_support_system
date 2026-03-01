import { TableHead, TableHeader, TableRow } from "../ui/table";

export default function TableHeaders({ rows }: { rows: string[] }) {

  const getWidth = (row: string) => {
    switch (row) {
      case "Ticket #": return "w-22";
      case "Status": return "w-22";
      case "Priority": return "w-22";
      case "Agent": return "w-22";
      default: return "w-32";
    }
  }

  return (
    <TableHeader>
      <TableRow className="hover:bg-inherit">
        {rows.map((row: string) => (
          <TableHead key={row} className={`${getWidth(row)} text-white/90`}>{row}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}