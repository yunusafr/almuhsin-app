import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import {
  ClipboardCheck,
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
import {
  ATTENDANCE_TYPES,
  ATTENDANCE_STATUSES,
} from "@/features/presensi/schemas/attendance-schema";

function normalizeData(response) {
  const list = response?.data ?? response ?? [];

  return Array.isArray(list) ? list : [];
}

export default function RekapHarianPage() {
  const { data, isLoading, refetch } = useAttendances();

  const attendances = normalizeData(data);

  const [date, setDate] = useState(() => format(new Date(), "yyyy-MM-dd"));

  const dayRecords = useMemo(() => {
    return attendances.filter((item) => item.date === date);
  }, [attendances, date]);

  const statistics = useMemo(() => {
    return dayRecords.reduce(
      (acc, item) => {
        acc.total++;

        const students = item.students ?? item.details ?? [];

        students.forEach((entry) => {
          acc[entry.status] = (acc[entry.status] ?? 0) + 1;
        });

        return acc;
      },
      { total: 0, hadir: 0, izin: 0, sakit: 0, alfa: 0 },
    );
  }, [dayRecords]);

  const typeSummary = useMemo(() => {
    return ATTENDANCE_TYPES.map((type) => {
      const records = dayRecords.filter((item) => item.type === type.value);

      const counts = records.reduce(
        (acc, item) => {
          const students = item.students ?? item.details ?? [];

          students.forEach((entry) => {
            acc[entry.status] = (acc[entry.status] ?? 0) + 1;
          });

          return acc;
        },
        { hadir: 0, izin: 0, sakit: 0, alfa: 0 },
      );

      return { ...type, records: records.length, ...counts };
    });
  }, [dayRecords]);

  const columns = [
    {
      accessorKey: "type",
      header: "Jenis Kegiatan",
      cell: ({ row }) => {
        const meta = row.original;

        const colorMap = {
          sholat: "green",
          ngaji: "blue",
          ekstrakurikuler: "yellow",
          ngaji_pasan: "gray",
        };

        return (
          <div className="flex items-center gap-2">
            <StatusBadge color={colorMap[meta.value]}>
              {meta.label}
            </StatusBadge>

            <span className="text-xs text-muted-foreground">
              {meta.records} sesi
            </span>
          </div>
        );
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
      id: "total",
      header: "Total",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <span className="font-bold">
            {item.hadir + item.izin + item.sakit + item.alfa}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rekap Harian"
        back="/app"
        description="Ringkasan presensi santri per hari."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring"
            />

            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Sesi"
          value={statistics.total}
          icon={ClipboardCheck}
        />

        <StatCard
          title="Hadir"
          value={statistics.hadir}
          icon={UserCheck}
        />

        <StatCard
          title="Izin"
          value={statistics.izin}
          icon={CalendarClock}
        />

        <StatCard
          title="Sakit"
          value={statistics.sakit}
          icon={CalendarClock}
        />

        <StatCard
          title="Alfa"
          value={statistics.alfa}
          icon={UserX}
        />
      </div>

      <TableContainer>
        <DataTableHeader
          title={`Rekap ${format(parseISO(date), "EEEE, dd MMMM yyyy", { locale: id })}`}
          description="Rekapitulasi kehadiran per jenis kegiatan."
        />

        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
              Memuat data...
            </div>
          </div>
        ) : typeSummary.every((item) => item.records === 0) ? (
          <EmptyState
            title="Belum ada presensi"
            description="Tidak ada catatan presensi pada tanggal ini."
          />
        ) : (
          <DataTable data={typeSummary} columns={columns} />
        )}
      </TableContainer>
    </div>
  );
}
