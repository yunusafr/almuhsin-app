import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/status-badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ENROLLMENT_STATUSES } from "@/features/enrollment/schemas/enrollment-schema";

// Docs API memakai key `class_room` pada daftar & `classRoom` pada detail
const getClass = (row) =>
  row.class_room ?? row.classRoom ?? null;

const getAcademicYear = (row) =>
  row.academic_year ?? row.academicYear ?? null;

export const enrollmentColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "student",
    header: "Santri",
    cell: ({ row }) => {
      const student = row.original.student;

      return (
        <div>
          <p className="font-medium">{student?.name ?? "-"}</p>

          <p className="text-xs text-muted-foreground">
            {student?.nis ?? ""}
          </p>
        </div>
      );
    },
  },
  {
    id: "class",
    header: "Kelas",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {getClass(row.original)?.name ?? "-"}
      </span>
    ),
  },
  {
    id: "academic_year",
    header: "Tahun Ajaran",
    cell: ({ row }) => (
      <span className="text-sm">
        {getAcademicYear(row.original)?.name ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = ENROLLMENT_STATUSES.find(
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
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button size="icon" variant="ghost" />}
        >
          <MoreHorizontal className="h-4 w-4" />
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
