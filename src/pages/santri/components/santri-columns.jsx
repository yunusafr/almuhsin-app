import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import StatusBadge from "@/components/common/status-badge";

export const santriColumns = ({ onEdit, onDelete, onDetail }) => [
  {
    accessorKey: "nis",

    header: "NIS",
  },

  {
    accessorKey: "name",

    header: "Nama Santri",
  },

  {
    accessorKey: "rombel",

    header: "Rombel",
  },

  {
    accessorKey: "guardian_name",

    header: "Wali Santri",
  },

  {
    accessorKey: "guardian_phone",

    header: "No. HP",
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;

      switch (status) {
        case "aktif":
          return <StatusBadge color="green">Aktif</StatusBadge>;

        case "lulus":
          return <StatusBadge color="blue">Lulus</StatusBadge>;

        case "keluar":
          return <StatusBadge color="red">Keluar</StatusBadge>;

        case "mutasi":
          return <StatusBadge color="yellow">Mutasi</StatusBadge>;

        default:
          return <StatusBadge>{status}</StatusBadge>;
      }
    },
  },

  {
    id: "aksi",

    header: "",

    enableSorting: false,

    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onDetail?.(row.original)}>
            <Eye className="mr-2 h-4 w-4" />
            Detail
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
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
