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

// Docs API punya dua bentuk respons:
//  - nested: student.{name,nis}, class_room/academic_year (daftar lama)
//  - flat:   student_name, student_nis, class_name, academic_year_name
const getStudent = (row) =>
  row.student ?? {
    name: row.student_name,
    nis: row.student_nis,
    rombel: row.student_rombel,
  };

const getClass = (row) =>
  row.class_room ??
  row.classRoom ??
  (row.class_name ? { name: row.class_name } : null);

const getAcademicYear = (row) =>
  row.academic_year ??
  row.academicYear ??
  (row.academic_year_name ? { name: row.academic_year_name } : null);

export const enrollmentColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "student",
    header: "Santri",
    cell: ({ row }) => {
      const student = getStudent(row.original);

      return (
        <div>
          <p className="font-medium">{student?.name ?? "-"}</p>

          <p className="text-xs text-muted-foreground">
            {student?.rombel ? `${student.rombel} · ` : ""}
            {student?.nis ?? ""}
          </p>
        </div>
      );
    },
  },
  {
    id: "class",
    header: "Kelas Pondok",
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
    accessorKey: "created_at",
    header: "Dibuat",
    cell: ({ row }) => {
      const date = row.original.created_at;

      return date
        ? new Date(date).toLocaleDateString("id-ID")
        : "-";
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
