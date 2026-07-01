import { useMemo, useState } from "react";

import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";
import DataTable from "@/components/data-table/data-table";

import { useClasses } from "@/features/kelas/hooks/use-classes";

import { classColumns } from "./components/class-columns";
import ClassDialog from "./components/class-dialog";
import ClassDeleteDialog from "./components/class-delete-dialog";

export default function ClassPage() {
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  const { data = [], isLoading, refetch } = useClasses();

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.level.toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  const columns = useMemo(
    () =>
      classColumns({
        onEdit: (row) => {
          setSelected(row);
          setDialogOpen(true);
        },

        onDelete: (row) => {
          setSelected(row);
          setDeleteOpen(true);
        },
      }),
    [],
  );

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Master Kelas"
          description="Kelola daftar kelas pondok."
          actions={
            <div className="flex gap-2">
              <Button variant="outline" onClick={refetch}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>

              <Button
                onClick={() => {
                  setSelected(null);
                  setDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Kelas
              </Button>
            </div>
          }
        />

        <TableContainer>
          <DataTableHeader
            title="Daftar Master Kelas"
            description={`${filteredData.length} kelas`}
            search={
              <DataTableSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kelas..."
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

      <ClassDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selected}
      />

      <ClassDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        data={selected}
      />
    </>
  );
}
