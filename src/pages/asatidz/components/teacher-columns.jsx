import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const teacherColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
          row.original.gender === "L"
            ? "bg-blue-100 text-blue-700"
            : "bg-pink-100 text-pink-700"
        }`}
      >
        {row.original.gender === "L" ? "Laki-laki" : "Perempuan"}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "No. HP",
  },
  {
    accessorKey: "created_at",
    header: "Dibuat",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
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
