import { CalendarCheck, DoorOpen, MoreHorizontal, Trash2, Undo2 } from "lucide-react";

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

function formatJam(value) {
  if (!value) return "-";

  return String(value).slice(0, 5);
}

export const perizinanColumns = ({ onKembali, onDelete }) => [
  {
    accessorKey: "student",
    header: "Santri",
    cell: ({ row }) => {
      const student = row.original.student;

      return (
        <div>
          <p className="font-medium">{student?.name ?? "-"}</p>

          <p className="text-xs text-muted-foreground">
            {student?.nis ?? "-"}
          </p>
        </div>
      );
    },
  },
  {
    id: "keluar",
    header: "Keluar",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <DoorOpen className="h-4 w-4 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-sm font-medium">
            {formatDate(row.original.tgl_keluar)}
          </p>

          <p className="text-xs text-muted-foreground">
            {formatJam(row.original.jam_keluar)}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "kembali",
    header: "Kembali",
    cell: ({ row }) =>
      row.original.tgl_kembali ? (
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />

          <div>
            <p className="text-sm font-medium">
              {formatDate(row.original.tgl_kembali)}
            </p>

            <p className="text-xs text-muted-foreground">
              {formatJam(row.original.jam_kembali)}
            </p>
          </div>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      ),
  },
  {
    accessorKey: "alasan_keluar",
    header: "Alasan",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-56 text-sm">
        {row.original.alasan_keluar ?? "-"}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.tgl_kembali ? (
        <StatusBadge color="green">Sudah Kembali</StatusBadge>
      ) : (
        <StatusBadge color="yellow">Belum Kembali</StatusBadge>
      ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const sudahKembali = !!row.original.tgl_kembali;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {!sudahKembali && (
              <DropdownMenuItem onClick={() => onKembali(row.original)}>
                <Undo2 className="mr-2 h-4 w-4" />
                Santri Kembali
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(row.original)}
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
