import { MoreHorizontal, Pencil, ShieldCheck, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/status-badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const securityGuardColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="h-4 w-4" />
        </div>

        <p className="font-medium">{row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.email ?? "-"}</span>
    ),
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => (
      <StatusBadge color="blue">
        {row.original.roles?.[0] ?? "Keamanan"}
      </StatusBadge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Dibuat",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <Pencil className="mr-2 h-4 w-4" />
            Ubah
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
