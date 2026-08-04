import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/status-badge";
import { TEACHER_ATTENDANCE_STATUSES } from "@/features/presensi-guru/schemas/teacher-attendance-schema";

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatJam(value) {
  if (!value) return "-";

  return String(value).slice(0, 5);
}

export const presensiGuruColumns = ({ onEdit }) => [
  {
    accessorKey: "teacher",
    header: "Guru",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">
          {row.original.teacher?.name ?? "-"}
        </p>

        <p className="text-xs text-muted-foreground">
          {row.original.user?.name ?? ""}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatDate(row.original.tanggal)}
      </span>
    ),
  },
  {
    accessorKey: "jam",
    header: "Jam",
    cell: ({ row }) => (
      <span className="text-sm">{formatJam(row.original.jam)}</span>
    ),
  },
  {
    accessorKey: "kelas_diisi",
    header: "Kelas Diisi",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.kelas_diisi || "-"}
      </span>
    ),
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
    cell: ({ row }) => {
      const status = TEACHER_ATTENDANCE_STATUSES.find(
        (s) => s.value === row.original.keterangan,
      );

      return (
        <StatusBadge color={status?.color ?? "gray"}>
          {status?.label ?? row.original.keterangan ?? "-"}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "keterangan_tambahan",
    header: "Catatan",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-56 text-sm">
        {row.original.keterangan_tambahan || "-"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onEdit(row.original)}
        aria-label="Edit presensi"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    ),
  },
];
