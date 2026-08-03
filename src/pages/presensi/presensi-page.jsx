import { useMemo, useState } from "react";
import {
  ClipboardCheck,
  Plus,
  RefreshCw,
  UserCheck,
  UserX,
  CalendarClock,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";
import DataTable from "@/components/data-table/data-table";

import { useAttendances } from "@/features/presensi/hooks/use-attendances";
import { ATTENDANCE_TYPES } from "@/features/presensi/schemas/attendance-schema";

import { attendanceColumns } from "./components/attendance-columns";
import AttendanceDialog from "./components/attendance-dialog";

function normalizeData(response) {
  const list = response?.data ?? response ?? [];

  return Array.isArray(list) ? list : [];
}

export default function PresensiPage() {
  const { data, isLoading, refetch } = useAttendances();

  const attendances = normalizeData(data);

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return attendances.filter((item) => {
      const typeLabel =
        ATTENDANCE_TYPES.find((t) => t.value === item.type)?.label ?? "";

      return (
        item.date?.includes(keyword) ||
        item.type?.toLowerCase().includes(keyword) ||
        typeLabel.toLowerCase().includes(keyword) ||
        item.academic_year?.name?.toLowerCase().includes(keyword) ||
        item.class?.name?.toLowerCase().includes(keyword)
      );
    });
  }, [attendances, search]);

  const statistics = useMemo(() => {
    return attendances.reduce(
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
  }, [attendances]);

  const columns = useMemo(() => attendanceColumns(), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Presensi Santri"
        description="Kelola dan input presensi kehadiran santri."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Input Presensi
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Presensi"
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
          title="Riwayat Presensi"
          description={`Total ${filteredData.length} catatan presensi`}
          search={
            <DataTableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tanggal, jenis, kelas..."
            />
          }
        />

        <DataTable
          data={filteredData}
          columns={columns}
          loading={isLoading}
        />
      </TableContainer>

      <AttendanceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
