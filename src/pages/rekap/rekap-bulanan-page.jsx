import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import {
  CalendarDays,
  RefreshCw,
  UserCheck,
  CalendarClock,
  UserX,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import StatusBadge from "@/components/common/status-badge";
import EmptyState from "@/components/common/empty-state";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTable from "@/components/data-table/data-table";

import { useAttendances } from "@/features/presensi/hooks/use-attendances";
import { ATTENDANCE_STATUSES } from "@/features/presensi/schemas/attendance-schema";

import { listData } from "@/lib/utils";

function countStatuses(records) {
  return records.reduce(
    (acc, item) => {
      const students = item.students ?? item.details ?? [];

      students.forEach((entry) => {
        acc[entry.status] = (acc[entry.status] ?? 0) + 1;
      });

      return acc;
    },
    { hadir: 0, izin: 0, sakit: 0, alfa: 0 },
  );
}

export default function RekapBulananPage() {
  const { data, isLoading, refetch } = useAttendances({ per_page: 1000 });

  // API v2 paginated — normalisasi ke array.
  const attendances = listData(data);

  const [month, setMonth] = useState(() => format(new Date(), "yyyy-MM"));

  const monthRecords = useMemo(() => {
    return attendances.filter((item) => item.date?.startsWith(month));
  }, [attendances, month]);

  const monthStatistics = useMemo(
    () => countStatuses(monthRecords),
    [monthRecords],
  );

  const dailySummary = useMemo(() => {
    const map = new Map();

    monthRecords.forEach((item) => {
      if (!map.has(item.date)) {
        map.set(item.date, []);
      }

      map.get(item.date).push(item);
    });

    return Array.from(map.entries())
      .map(([date, records]) => ({
        date,
        total: records.length,
        ...countStatuses(records),
      }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [monthRecords]);

  const totalSantri = monthStatistics.hadir + monthStatistics.izin + monthStatistics.sakit + monthStatistics.alfa;
  const kehadiran = totalSantri
    ? Math.round((monthStatistics.hadir / totalSantri) * 100)
    : 0;

  const columns = [
    {
      accessorKey: "date",
      header: "Tanggal",
      cell: ({ row }) => {
        const date = row.original.date;

        try {
          return (
            <span className="whitespace-nowrap font-medium">
              {format(parseISO(date), "EEEE, dd MMMM yyyy", { locale: id })}
            </span>
          );
        } catch {
          return date;
        }
      },
    },
    ...ATTENDANCE_STATUSES.map((status) => ({
      accessorKey: status.value,
      header: status.label,
      cell: ({ row }) => (
        <span className="font-semibold">{row.original[status.value]}</span>
      ),
    })),
    {
      accessorKey: "total",
      header: "Sesi",
      cell: ({ row }) => (
        <span className="font-bold">{row.original.total}</span>
      ),
    },
  ];

  const monthLabel = useMemo(() => {
    try {
      return format(parseISO(`${month}-01`), "MMMM yyyy", { locale: id });
    } catch {
      return month;
    }
  }, [month]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rekap Bulanan"
        back="/app"
        description="Ringkasan presensi santri per bulan."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-10 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring"
            />

            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Hari Aktif"
          value={dailySummary.length}
          icon={CalendarDays}
        />

        <StatCard
          title="Total Kehadiran"
          value={totalSantri}
          icon={UserCheck}
        />

        <StatCard
          title="Persentase Hadir"
          value={`${kehadiran}%`}
          icon={UserCheck}
        />

        <StatCard
          title="Ketidakhadiran"
          value={monthStatistics.izin + monthStatistics.sakit + monthStatistics.alfa}
          icon={CalendarClock}
        />
      </div>

      <TableContainer>
        <DataTableHeader
          title={`Rekap ${monthLabel}`}
          description="Rekapitulasi kehadiran harian selama bulan berjalan."
        />

        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
              Memuat data...
            </div>
          </div>
        ) : dailySummary.length === 0 ? (
          <EmptyState
            title="Belum ada data"
            description="Tidak ada catatan presensi pada bulan ini."
          />
        ) : (
          <DataTable data={dailySummary} columns={columns} />
        )}
      </TableContainer>

      <div className="flex flex-wrap items-center gap-4 rounded-3xl border bg-card p-5 text-sm">
        <span className="font-medium">Keterangan:</span>

        {ATTENDANCE_STATUSES.map((status) => (
          <span key={status.value} className="flex items-center gap-2">
            <StatusBadge color={status.color}>{status.label}</StatusBadge>
          </span>
        ))}

        <span className="ml-auto text-muted-foreground">
          <UserX size={14} className="mr-1 inline" />
          Alfa = tidak hadir tanpa keterangan
        </span>
      </div>
    </div>
  );
}
