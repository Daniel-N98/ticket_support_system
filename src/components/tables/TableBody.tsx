import { TableBody } from "../ui/table";

export default function MainTableBody({ children }: { children: React.ReactNode }) {

  return (
    <TableBody className="text-white/60">
      {children}
    </TableBody>
  )
}