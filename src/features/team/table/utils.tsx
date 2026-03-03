import { Column } from "@/types/Ticket"
import { CustomerCell } from "@/components/tickets/cells/CustomerCell";
import StatusTag from "@/components/tickets/tags/StatusTag";
import { UserType } from "@/types/User";

export const COLUMNS: Column<UserType>[] = [
  {
    key: "name",
    header: "Name",
    render: (row: UserType) => (
      <CustomerCell
        name={row.name}
        email={row.email}
      />
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (row) => (
      <p className="font-medium text-white truncate text-ellipsis max-w-48">
        {row.role}
      </p>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusTag status={row.status} />,
  },
  {
    key: "createdAt",
    header: "Created",
    render: (row) => <p>{new Date(row.createdAt).toDateString()}</p>,
  },
  {
    key: "updatedAt",
    header: "Updated",
    render: (row) => <p>{new Date(row.createdAt).toDateString()}</p>,
  },
];