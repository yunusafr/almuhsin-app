import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

import StatusBadge from "@/components/common/status-badge";

const TYPE_META = {
  sholat: { label: "Sholat", color: "green" },
  ngaji: { label: "Ngaji", color: "blue" },
  ekstrakurikuler: { label: "Ekstrakurikuler", color: "yellow" },
  ngaji_pasan: { label: "Ngaji Pasan", color: "gray" },
};

function summarize(attendance) {
  const students = attendance?.students ?? attendance?.details ?? [];

  return students.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    },
    { hadir: 0, izin: 0, sakit: 0, alfa: 0 },
  );
}

export const attendanceColumns = () => [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = row.original.date;

      if (!date) return "-";

      try {
        return (
          <span className="whitespace-nowrap">
            {format(parseISO(date), "EEEE, dd MMM yyyy", { locale: id })}
          </span>
        );
      } catch {
        return date;
      }
    },
  },

  {
    accessorKey: "type",
    header: "Jenis",
    cell: ({ row }) => {
      const type = row.original.type;
      const meta = TYPE_META[type] ?? { label: type, color: "gray" };

      return (
        <div>
          <StatusBadge color={meta.color}>{meta.label}</StatusBadge>

          {row.original.sub_type && (
            <p className="mt-1 text-xs text-muted-foreground">
              {row.original.sub_type}
            </p>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "academic_year",
    header: "Tahun Ajaran",
    cell: ({ row }) => {
      const year = row.original.academic_year;

      return (
        <span className="whitespace-nowrap">
          {year?.name ?? row.original.academic_year_name ?? "-"}
        </span>
      );
    },
  },

  {
    accessorKey: "class",
    header: "Kelas",
    cell: ({ row }) => {
      const kelas = row.original.class;

      return kelas?.name ?? row.original.class_name ?? "-";
    },
  },

  {
    id: "summary",
    header: "Ringkasan",
    cell: ({ row }) => {
      const counts = summarize(row.original);

      return (
        <div className="flex flex-wrap gap-1.5">
          <StatusBadge color="green">H {counts.hadir}</StatusBadge>
          <StatusBadge color="yellow">I {counts.izin}</StatusBadge>
          <StatusBadge color="blue">S {counts.sakit}</StatusBadge>
          <StatusBadge color="red">A {counts.alfa}</StatusBadge>
        </div>
      );
    },
  },

  {
    accessorKey: "created_at",
    header: "Dibuat",
    cell: ({ row }) => {
      const created = row.original.created_at;

      if (!created) return "-";

      try {
        return format(parseISO(created), "dd MMM yyyy HH:mm");
      } catch {
        return created;
      }
    },
  },
];
