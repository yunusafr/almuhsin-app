import { useMemo, useState } from "react";

import { Pencil, Trash2, Plus, Search, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatusBadge from "@/components/common/status-badge";

import DataTable from "@/components/data-table/data-table";
import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";

import AcademicYearDialog from "./components/academic-year-dialog";
import AcademicYearDeleteDialog from "./components/academic-year-delete-dialog";
import AcademicYearSwitch from "./components/academic-year-switch";

import { useAcademicYears } from "@/features/academic-year/hooks/use-academic-year";

export default function AcademicYearPage() {
  const { data, isLoading } = useAcademicYears();

  const academicYears = data?.data ?? [];

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return academicYears.filter((item) => {
      return item.name.toLowerCase().includes(keyword);
    });
  }, [academicYears, search]);

  const columns = [
    {
      accessorKey: "name",

      header: "Tahun Pelajaran",
    },

    {
      accessorKey: "is_active",

      header: "Status",

      cell: ({ row }) =>
        row.original.is_active ? (
          <StatusBadge color="green">Aktif</StatusBadge>
        ) : (
          <StatusBadge color="gray">Tidak Aktif</StatusBadge>
        ),
    },

    {
      id: "switch",

      header: "Aktifkan",

      cell: ({ row }) => <AcademicYearSwitch academicYear={row.original} />,
    },

    {
      id: "aksi",

      header: "Aksi",

      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              setSelected(row.original);

              setDialogOpen(true);
            }}
          >
            <Pencil size={16} />
          </Button>

          <Button
            size="icon"
            variant="destructive"
            disabled={row.original.is_active}
            onClick={() => {
              setSelected(row.original);

              setDeleteOpen(true);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];
  const activeYear = academicYears.find((x) => x.is_active);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tahun Pelajaran"
        description="Kelola tahun pelajaran yang digunakan dalam sistem."
        actions={
          <Button
            onClick={() => {
              setSelected(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Tahun
          </Button>
        }
      />

      {/* Statistic */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tahun</p>

              <h2 className="mt-3 text-3xl font-bold">
                {academicYears.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-primary/10 p-3">
              <CalendarDays className="text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Tahun Aktif</p>

          <h2 className="mt-3 text-2xl font-bold">{activeYear?.name ?? "-"}</h2>

          <div className="mt-3">
            <StatusBadge color="green">Aktif</StatusBadge>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Tidak Aktif</p>

          <h2 className="mt-3 text-3xl font-bold">
            {academicYears.filter((x) => !x.is_active).length}
          </h2>
        </div>
      </div>

      {/* Table */}

      <TableContainer>
        <DataTableHeader
          title="Daftar Tahun Pelajaran"
          description={`Total ${filteredData.length} data`}
          search={
            <DataTableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tahun pelajaran..."
            />
          }
        />

        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
              Memuat data...
            </div>
          </div>
        ) : (
          <DataTable data={filteredData} columns={columns} />
        )}
      </TableContainer>

      {/* Dialog */}

      <AcademicYearDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selected}
      />

      <AcademicYearDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        data={selected}
      />
    </div>
  );
}
