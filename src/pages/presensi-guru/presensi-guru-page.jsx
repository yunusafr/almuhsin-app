import { useMemo, useState } from "react";
import {
  ClipboardCheck,
  Plus,
  RefreshCw,
  UserCheck,
  UserX,
  CalendarClock,
  CalendarCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";
import DataTable from "@/components/data-table/data-table";

import { useDebounce } from "@/features/santri/hooks/use-debounce";
import { useTeacherAttendances } from "@/features/presensi-guru/hooks/use-teacher-attendances";

import { presensiGuruColumns } from "./components/presensi-guru-columns";
import PresensiGuruDialog from "./components/presensi-guru-dialog";

export default function PresensiGuruPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, refetch } = useTeacherAttendances({
    search: debouncedSearch.trim() || undefined,
    page,
  });

  // Respons API: { success, message, data: { current_page, data: [], total, per_page } }
  const paginated = data?.data ?? data ?? {};

  const attendances = paginated.data ?? [];
  const total = paginated.total ?? 0;
  const perPage = paginated.per_page ?? 10;
  const currentPage = paginated.current_page ?? 1;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const statistics = useMemo(() => {
    return (attendances ?? []).reduce(
      (acc, item) => {
        acc.total++;

        const status = item.keterangan;

        if (status) {
          acc[status] = (acc[status] ?? 0) + 1;
        }

        return acc;
      },
      { total: 0, hadir: 0, izin: 0, sakit: 0, alfa: 0 },
    );
  }, [attendances]);

  const columns = useMemo(
    () =>
      presensiGuruColumns({
        onEdit: (row) => {
          setSelected(row);
          setDialogOpen(true);
        },
      }),
    [],
  );

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Presensi Guru"
        description="Kelola daftar hadir / presensi guru oleh petugas keamanan."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Presensi
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
          icon={CalendarCheck}
        />

        <StatCard
          title="Alfa"
          value={statistics.alfa}
          icon={UserX}
        />
      </div>

      <TableContainer>
        <DataTableHeader
          title="Riwayat Presensi Guru"
          description={`Total ${total} catatan presensi`}
          search={
            <DataTableSearch
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari nama guru..."
            />
          }
        />

        <DataTable
          data={attendances}
          columns={columns}
          loading={isLoading}
          emptyMessage="Belum ada data presensi guru."
        />

        <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Menampilkan {attendances.length} dari {total} data
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Sebelumnya
            </Button>

            <span className="text-sm text-muted-foreground">
              Halaman {currentPage} dari {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => setPage((p) => p + 1)}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      </TableContainer>

      <PresensiGuruDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selected}
      />
    </div>
  );
}
