import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

import { downloadCsv, listData } from "@/lib/utils";
import { toast } from "sonner";

import { santriColumns } from "./components/santri-columns";

import SantriDialog from "./components/santri-dialog";
import SantriDetailDialog from "./components/santri-detail-dialog";
import StudentDeleteDialog from "./components/student-delete-dialog";
import ExternalStudentDialog from "./components/external-student-dialog";

export default function SantriPage() {
  const {
    data: studentsResponse,
    isLoading,
    refetch,
  } = useStudents({ per_page: 1000 });

  // API v2 paginated — normalisasi ke array.
  const data = listData(studentsResponse);

  const syncMutation = useSyncStudents();

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";

  const [selected, setSelected] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [externalOpen, setExternalOpen] = useState(false);

  // Pencarian memakai query param ?q= sebagai sumber kebenaran tunggal
  // (navbar search mengarah ke sini, dan URL ikut diperbarui saat mengetik).
  const handleSearchChange = (e) => {
    const value = e.target.value;

    const next = new URLSearchParams(searchParams);

    if (value.trim()) {
      next.set("q", value);
    } else {
      next.delete("q");
    }

    setSearchParams(next, { replace: true });
  };

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
    setSelected(student);
    setDetailOpen(true);
  }

  function handleExternalPull() {
    setExternalOpen(true);
  }

  function handleExportCsv() {
    downloadCsv({
      filename: `data-santri-${new Date().toISOString().slice(0, 10)}.csv`,
      columns: [
        { key: "nis", label: "NIS" },
        { key: "name", label: "Nama" },
        { key: "tingkat", label: "Tingkat" },
        { key: "rombel", label: "Rombel" },
        { key: "guardian_name", label: "Wali" },
        { key: "guardian_phone", label: "No HP Wali" },
        { key: "status", label: "Status" },
      ],
      rows: filteredData,
    });
  }

  function handleSync() {
    syncMutation.mutate(undefined, {
      onSuccess: (result) => {
        // API v2: { total, updated, failed }
        const { total, updated, failed } = result?.data ?? {};

        if (total !== undefined) {
          toast.success(
            failed > 0
              ? `Sinkronisasi selesai: ${updated} dari ${total} siswa diperbarui (gagal: ${failed}).`
              : `Sinkronisasi selesai: ${updated} dari ${total} siswa diperbarui.`,
          );
        } else {
          toast.success("Sinkronisasi data santri berhasil");
        }
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ??
            "Gagal sinkronisasi. Periksa koneksi ke sistem pusat.",
        );
      },
    });
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
              onClick={handleExportCsv}
              disabled={filteredData.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
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
              onChange={handleSearchChange}
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

      <SantriDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        student={selected}
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