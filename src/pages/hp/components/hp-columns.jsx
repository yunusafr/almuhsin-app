import { MoreHorizontal, Trash2, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/status-badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PHONE_COLLECTION_STATUSES } from "@/features/hp/schemas/phone-collection-schema";

const formatDateTime = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const hpColumns = ({ onReturn, onDelete }) => [
  {
    accessorKey: "student",
    header: "Santri",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div>
          <p className="font-medium">
            {item.student_name ?? item.student?.name ?? "-"}
          </p>

          <p className="text-xs text-muted-foreground">
            {item.student_nis ?? item.student?.nis ?? ""}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "phone_name",
    header: "Nama HP",
    cell: ({ row }) => row.original.phone_name ?? "-",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = PHONE_COLLECTION_STATUSES.find(
        (s) => s.value === row.original.status,
      );

      return (
        <StatusBadge color={status?.color ?? "gray"}>
          {status?.label ?? row.original.status ?? "-"}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "collected_at",
    header: "Dikumpulkan",
    cell: ({ row }) => formatDateTime(row.original.collected_at),
  },
  {
    accessorKey: "returned_at",
    header: "Dikembalikan",
    cell: ({ row }) => formatDateTime(row.original.returned_at),
  },
  {
    id: "receiver",
    header: "Petugas",
    cell: ({ row }) => {
      const item = row.original;

      if (item.status === "dikembalikan" && item.returner_name) {
        return (
          <div>
            <p className="text-sm">{item.returner_name}</p>
            <p className="text-xs text-muted-foreground">
              Kembali: {item.receiver_name}
            </p>
          </div>
        );
      }

      return item.receiver_name ?? "-";
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const item = row.original;
      const alreadyReturned = item.status === "dikembalikan";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button size="icon" variant="ghost" />}
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {!alreadyReturned && (
              <DropdownMenuItem onClick={() => onReturn(item)}>
                <Undo2 className="mr-2 h-4 w-4" />
                Kembalikan HP
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(item)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
