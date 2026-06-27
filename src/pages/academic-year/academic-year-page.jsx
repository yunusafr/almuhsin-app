import { useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatusBadge from "@/components/common/status-badge";

import TableContainer from "@/components/data-table/table-container";
import DataTable from "@/components/data-table/data-table";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";

import {
  useAcademicYears,
  useActiveAcademicYear,
} from "@/features/academic-year/hooks/use-academic-year";


export default function AcademicYearPage() {
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data, isLoading, refetch } = useAcademicYears();

  const { data: activeYear } = useActiveAcademicYear();

  const rows = data?.data ?? [];

  const filteredData = useMemo(() => {
    return rows.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

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
          <StatusBadge>Aktif</StatusBadge>
        ) : (
          <StatusBadge variant="secondary">
            Tidak Aktif
          </StatusBadge>
        ),
    },

    {
      accessorKey: "created_at",

      header: "Dibuat",

      cell: ({ row }) =>
        new Date(row.original.created_at).toLocaleDateString("id-ID"),
    },

    {
      id: "action",

      header: "",

      cell: ({ row }) => (
        <div className="flex justify-end gap-2">

          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              setSelected(row.original);

              // nanti buka dialog edit
            }}
          >
            <Pencil className="h-4 w-4" />
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
            <Trash2 className="h-4 w-4" />
          </Button>

        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="Tahun Pelajaran"
        description="Kelola tahun pelajaran pondok"

        actions={
          <div className="flex gap-2">

            <Button
              variant="outline"
              onClick={refetch}
            >
              <RefreshCw className="mr-2 h-4 w-4" />

              Refresh
            </Button>

            <Button
              onClick={() => {
                // nanti buka dialog tambah
              }}
            >
              <Plus className="mr-2 h-4 w-4" />

              Tambah
            </Button>

          </div>
        }
      />

      <TableContainer>

        <DataTableHeader
          title="Daftar Tahun Pelajaran"
          description={`${filteredData.length} data ditemukan`}
          search={
            <DataTableSearch
              placeholder="Cari tahun pelajaran..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />

        <DataTable
          data={filteredData}
          columns={columns}
          loading={isLoading}
        />

      </TableContainer>


    </div>
  );
}