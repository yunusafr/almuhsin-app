import { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  GraduationCap,
  Plus,
  RefreshCw,
  RotateCw,
  UserCheck,
  UserX,
  Users,
  Download,
  Database,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";

import TableContainer from "@/components/data-table/table-container";
import DataTable from "@/components/data-table/data-table";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";

import {
  useStudents,
  useSyncStudents,
} from "@/features/santri/hooks/use-students";

import { santriColumns } from "./components/santri-columns";

import SantriDialog from "./components/santri-dialog";
import StudentDeleteDialog from "./components/student-delete-dialog";
import ExternalStudentDialog from "./components/external-student-dialog";

export default function SantriPage() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useStudents();

  const syncMutation = useSyncStudents();

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [externalOpen, setExternalOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Filter
  |--------------------------------------------------------------------------
  */

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      return (
        item.nis?.toLowerCase().includes(keyword) ||
        item.name?.toLowerCase().includes(keyword) ||
        item.rombel?.toLowerCase().includes(keyword) ||
        item.guardian_name?.toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  /*
  |--------------------------------------------------------------------------
  | Statistics
  |--------------------------------------------------------------------------
  */

  const statistics = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        acc.total++;

        switch (item.status) {
          case "aktif":
            acc.aktif++;
            break;

          case "lulus":
            acc.lulus++;
            break;

          case "keluar":
            acc.keluar++;
            break;

          case "mutasi":
            acc.mutasi++;
            break;
        }

        return acc;
      },
      {
        total: 0,
        aktif: 0,
        lulus: 0,
        keluar: 0,
        mutasi: 0,
      }
    );
  }, [data]);

  /*
  |--------------------------------------------------------------------------
  | Actions
  |--------------------------------------------------------------------------
  */

  function handleCreate() {
    setSelected(null);
    setDialogOpen(true);
  }

function handleEdit(student) {

  setSelected(student);

  setTimeout(() => {
    setDialogOpen(true);
  }, 0);
}

  function handleDelete(student) {
    setSelected(student);
    setDeleteOpen(true);
  }

  function handleDetail(student) {
    console.log(student);

    // Next:
    // setSelected(student)
    // setDetailOpen(true)
  }

  function handleExternalPull() {
    setExternalOpen(true);
  }

  function handleImportExcel() {
    console.log("Import Excel");
  }

  function handleSync() {
    syncMutation.mutate();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Santri"
        description="Kelola seluruh data santri pondok pesantren."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Santri
            </Button>

            <Button
              variant="outline"
              onClick={handleImportExcel}
            >
              <Download className="mr-2 h-4 w-4" />
              Import Excel
            </Button>

            <Button
              variant="outline"
              onClick={handleExternalPull}
            >
              <Database className="mr-2 h-4 w-4" />
              Tarik Data
            </Button>

            <Button
              variant="outline"
              onClick={handleSync}
              disabled={syncMutation.isPending}
            >
              <RotateCw
                className={`mr-2 h-4 w-4 ${
                  syncMutation.isPending
                    ? "animate-spin"
                    : ""
                }`}
              />

              Sinkronisasi
            </Button>

            <Button
              variant="outline"
              onClick={refetch}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Santri"
          value={statistics.total}
          icon={Users}
        />

        <StatCard
          title="Aktif"
          value={statistics.aktif}
          icon={UserCheck}
        />

        <StatCard
          title="Lulus"
          value={statistics.lulus}
          icon={GraduationCap}
        />

        <StatCard
          title="Keluar"
          value={statistics.keluar}
          icon={UserX}
        />

        <StatCard
          title="Mutasi"
          value={statistics.mutasi}
          icon={ArrowRightLeft}
        />
      </div>

      <TableContainer>
        <DataTableHeader
          title="Daftar Santri"
          description={`Total ${filteredData.length} santri`}
          search={
            <DataTableSearch
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari NIS, Nama, Rombel..."
            />
          }
        />

        <DataTable
          loading={isLoading}
          data={filteredData}
          columns={santriColumns({
            onDetail: handleDetail,
            onEdit: handleEdit,
            onDelete: handleDelete,
          })}
        />
      </TableContainer>

      <SantriDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selected}
      />

      <StudentDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        student={selected}
      />

      <ExternalStudentDialog
        open={externalOpen}
        onOpenChange={setExternalOpen}
      />
    </div>
  );
}