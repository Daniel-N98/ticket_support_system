import { TableHead, TableHeader, TableRow } from "../ui/table";

export default function TableHeaders({ rows, sortColumn, sortDirection, onHeaderClick }: { rows: string[], sortColumn: string | null, sortDirection: string, onHeaderClick: (header: string) => void }) {

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
          <TableHead key={row} className={`${getWidth(row)} text-white/90 hover:cursor-pointer`} onClick={() => onHeaderClick(row)}>{row} <span className="text-blue-400 text-sm">{sortColumn === row ? (sortDirection === "asc" ? "(asc)" : "(desc)") : ""}</span></TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}