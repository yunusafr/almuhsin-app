import { useMemo, useState } from "react";
import {
  CalendarCheck,
  DoorOpen,
  Plus,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";
import DataTable from "@/components/data-table/data-table";

import { useDebounce } from "@/features/santri/hooks/use-debounce";
import { useStudentLeaves } from "@/features/perizinan/hooks/use-student-leaves";

import { perizinanColumns } from "./components/perizinan-columns";
import PerizinanDialog from "./components/perizinan-dialog";
import KembaliDialog from "./components/kembali-dialog";

export default function PerizinanPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [kembaliOpen, setKembaliOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, refetch } = useStudentLeaves({
    search: debouncedSearch.trim() || undefined,
    page,
  });

  // Respons API: { success, message, data: { current_page, data: [], total, per_page } }
  const paginated = data?.data ?? data ?? {};

  const leaves = paginated.data ?? [];
  const total = paginated.total ?? 0;
  const perPage = paginated.per_page ?? 10;
  const currentPage = paginated.current_page ?? 1;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const statistics = useMemo(() => {
    return (leaves ?? []).reduce(
      (acc, item) => {
        acc.total++;

        if (item.tgl_kembali) {
          acc.kembali++;
        } else {
          acc.keluar++;
        }

        return acc;
      },
      { total: 0, keluar: 0, kembali: 0 },
    );
  }, [leaves]);

  const columns = useMemo(
    () =>
      perizinanColumns({
        onKembali: (row) => {
          setSelected(row);
          setKembaliOpen(true);
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
        title="Perizinan Santri"
        description="Kelola data keluar-masuk (izin) santri pondok."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Izin
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          title="Total Izin"
          value={statistics.total}
          icon={ShieldCheck}
        />

        <StatCard
          title="Sedang Keluar"
          value={statistics.keluar}
          icon={DoorOpen}
        />

        <StatCard
          title="Sudah Kembali"
          value={statistics.kembali}
          icon={CalendarCheck}
        />
      </div>

      <TableContainer>
        <DataTableHeader
          title="Daftar Izin Santri"
          description={`Total ${total} data izin`}
          search={
            <DataTableSearch
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari nama santri atau NIS..."
            />
          }
        />

        <DataTable
          data={leaves}
          columns={columns}
          loading={isLoading}
          emptyMessage="Belum ada data izin santri."
        />

        <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Menampilkan {leaves.length} dari {total} data
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

      <PerizinanDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <KembaliDialog
        open={kembaliOpen}
        onOpenChange={setKembaliOpen}
        data={selected}
      />
    </div>
  );
}
