import { Column, TicketType } from "@/types/Ticket"
import { CustomerCell } from "@/components/tickets/cells/CustomerCell";
import StatusTag from "@/components/tickets/tags/StatusTag";
import PriorityTag from "@/components/tickets/tags/PriorityTag";
import { MoreHorizontal, UserX } from "lucide-react";
import { AgentCell } from "@/components/tickets/cells/AgentCell";

export const COLUMNS: Column<TicketType>[] = [
  {
    key: "ticketId",
    header: "Ticket #",
    render: (row) => `#${row.ticketId}`,
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
      <p className="font-medium text-white truncate text-ellipsis max-w-48">
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
    render: (row: { agent: string[] | null }) => renderAgents(row.agent),
  },
  {
    key: "createdAt",
    header: "Date",
    render: (row) => (
      <span className="text-white/60 text-sm">{new Date(row.createdAt).toLocaleDateString()}</span>
    ),
  },
];

function renderAgents(agent: string[] | null) {
  if (!agent || agent.length === 0) {
    return (
      <div className="flex items-center gap-2 text-white/40 italic text-sm">
        <UserX className="w-4 h-4" />
      </div>
    );
  }

  const maxVisible = 3;
  const visibleAgents = agent.slice(0, maxVisible);
  const remainingCount = agent.length - maxVisible;

  return (
    <div className="flex items-center gap-1">
      {visibleAgents.map((a, idx) => {
        if (idx === maxVisible - 1 && remainingCount > 0) {
          return (
            <div key="more" className="flex items-center w-5 h-5 text-white/60 text-xs">
              <MoreHorizontal className="w-4 h-4" />
            </div>
          );
        }

        return <AgentCell key={idx} />;
      })}
    </div>
  );
}