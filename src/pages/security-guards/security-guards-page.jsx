import { useMemo, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTable from "@/components/data-table/data-table";

import { useSecurityGuards } from "@/features/security-guards/hooks/use-security-guards";

import { securityGuardColumns } from "./components/security-guard-columns";
import SecurityGuardDialog from "./components/security-guard-dialog";
import SecurityGuardDeleteDialog from "./components/security-guard-delete-dialog";

export default function SecurityGuardsPage() {
  const { data: guards = [], isLoading, refetch } = useSecurityGuards();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const columns = useMemo(
    () =>
      securityGuardColumns({
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
        title="Data Keamanan"
        description="Kelola akun login petugas satpam (role Keamanan) — Izin Santri, Pengumpulan HP, dan Presensi Guru."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button onClick={() => { setSelected(null); setDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Satpam
            </Button>
          </div>
        }
      />

      <TableContainer>
        <DataTableHeader
          title="Daftar Akun Satpam"
          description={`${guards.length} akun`}
        />

        <DataTable
          data={guards}
          columns={columns}
          loading={isLoading}
          emptyMessage="Belum ada akun satpam. Tambahkan lewat tombol di atas."
        />
      </TableContainer>

      <SecurityGuardDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selected}
      />

      <SecurityGuardDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        data={selected}
      />
    </div>
  );
}
