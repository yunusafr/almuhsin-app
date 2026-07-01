import { useMemo, useState } from "react";

import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";
import DataTable from "@/components/data-table/data-table";

import { useTeachers } from "@/features/asatidz/hooks/use-teachers";

import TeacherDialog from "./components/teacher-dialog";
import TeacherDeleteDialog from "./components/teacher-delete-dialog";
import { teacherColumns } from "./components/teacher-columns";

export default function TeacherPage() {
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  const { data = [], isLoading, refetch } = useTeachers();

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) => {
      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword) ||
        item.gender?.toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  const columns = useMemo(
    () =>
      teacherColumns({
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
          title="Data Asatidz"
          description="Kelola seluruh data ustadz dan ustadzah."
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
                Tambah Asatidz
              </Button>
            </div>
          }
        />

        <TableContainer>
          <DataTableHeader
            title="Daftar Asatidz"
            description={`${filteredData.length} data`}
            search={
              <DataTableSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau nomor HP..."
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

      <TeacherDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selected}
      />

      <TeacherDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        data={selected}
      />
    </>
  );
}
