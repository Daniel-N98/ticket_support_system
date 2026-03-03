import { Column } from "@/types/Ticket"
import { CustomerCell } from "@/components/tickets/cells/CustomerCell";
import StatusTag from "@/components/tags/StatusTag";
import { UserType } from "@/types/User";
import RoleTag, { RoleTagType } from "@/components/tags/RoleTag";

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
    render: (row) => <RoleTag role={row.role as RoleTagType} />
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