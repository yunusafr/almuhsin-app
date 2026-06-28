import { useMemo, useState } from "react";
import {
  Plus,
  RefreshCw,
  RotateCw,
  Users,
  UserCheck,
  GraduationCap,
  ArrowRightLeft,
  UserX,
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

import StudentDeleteDialog from "./components/student-delete-dialog";
import SantriDialog from "./components/santri-dialog";
import { santriColumns } from "./components/santri-columns";

export default function SantriPage() {
  const { data = [], isLoading, refetch } = useStudents();

  const syncMutation = useSyncStudents();

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) => {
      return (
        item.nis?.toLowerCase().includes(keyword) ||
        item.name?.toLowerCase().includes(keyword) ||
        item.rombel?.toLowerCase().includes(keyword) ||
        item.guardian_name?.toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  const total = data.length;

  const aktif = data.filter((x) => x.status === "aktif").length;

  const lulus = data.filter((x) => x.status === "lulus").length;

  const keluar = data.filter((x) => x.status === "keluar").length;

  const mutasi = data.filter((x) => x.status === "mutasi").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Santri"
        description="Kelola seluruh data santri pondok pesantren."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => syncMutation.mutate()}>
              <RotateCw className="mr-2 h-4 w-4" />
              Sinkronisasi
            </Button>

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
              Tambah Santri
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Santri" value={total} icon={Users} />

        <StatCard title="Aktif" value={aktif} icon={UserCheck} />

        <StatCard title="Lulus" value={lulus} icon={GraduationCap} />

        <StatCard title="Keluar" value={keluar} icon={UserX} />

        <StatCard title="Mutasi" value={mutasi} icon={ArrowRightLeft} />
      </div>

      <TableContainer>
        <DataTableHeader
          title="Daftar Santri"
          description={`Total ${filteredData.length} santri`}
          search={
            <DataTableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari NIS, nama, rombel..."
            />
          }
        />

        <DataTable
          loading={isLoading}
          data={filteredData}
          columns={santriColumns({
            onDetail: (row) => {
              console.log(row);
            },

            onEdit: (row) => {
              setSelected(row);
              setDialogOpen(true);
            },

            onDelete: (row) => {
              setSelected(row);
              setDeleteOpen(true);
            },
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
    </div>
  );
}
