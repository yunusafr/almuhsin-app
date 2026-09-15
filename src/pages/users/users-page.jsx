import { useMemo, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTable from "@/components/data-table/data-table";

import { useUsers } from "@/features/users/hooks/use-users";

import { userColumns } from "./components/user-columns";
import UserDialog from "./components/user-dialog";
import UserDeleteDialog from "./components/user-delete-dialog";

export default function UsersPage() {
  const { data: users = [], isLoading, refetch } = useUsers();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const columns = useMemo(
    () =>
      userColumns({
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
    <div className="space-y-6">
      <PageHeader
        title="Pengguna"
        description="Kelola seluruh akun login dan perannya (Super Admin, Ustadz, Bendahara, Keamanan)."
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
              Tambah Pengguna
            </Button>
          </div>
        }
      />

      <TableContainer>
        <DataTableHeader
          title="Daftar Pengguna"
          description={`${users.length} pengguna`}
        />

        <DataTable
          data={users}
          columns={columns}
          loading={isLoading}
          emptyMessage="Belum ada pengguna."
        />
      </TableContainer>

      <UserDialog open={dialogOpen} onOpenChange={setDialogOpen} data={selected} />

      <UserDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        data={selected}
      />
    </div>
  );
}
