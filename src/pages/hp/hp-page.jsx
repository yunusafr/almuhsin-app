import { useMemo, useState } from "react";
import {
  RefreshCw,
  Smartphone,
  Undo2,
  UserX,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTable from "@/components/data-table/data-table";

import { usePhoneCollections } from "@/features/hp/hooks/use-phone-collections";

import { hpColumns } from "./components/hp-columns";
import HpBulkDialog from "./components/hp-bulk-dialog";
import HpReturnDialog from "./components/hp-return-dialog";
import HpDeleteDialog from "./components/hp-delete-dialog";

export default function HpPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [bulkOpen, setBulkOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const params = useMemo(() => {
    return statusFilter !== "all"
      ? { status: statusFilter }
      : {};
  }, [statusFilter]);

  const { data: response, isLoading, refetch } = usePhoneCollections(params);
  const collections = response?.data ?? [];

  const stats = useMemo(() => {
    return collections.reduce(
      (acc, item) => {
        acc.total++;

        if (item.status) {
          acc[item.status] = (acc[item.status] ?? 0) + 1;
        }

        return acc;
      },
      { total: 0, dikumpulkan: 0, disita: 0, dikembalikan: 0 },
    );
  }, [collections]);

  const columns = useMemo(
    () =>
      hpColumns({
        onReturn: (row) => {
          setSelected(row);
          setReturnOpen(true);
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
        title="Pengumpulan HP"
        description="Kegiatan rutin pengumpulan HP santri — kumpulkan, sita, dan kembalikan."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button onClick={() => setBulkOpen(true)}>
              <Smartphone className="mr-2 h-4 w-4" />
              Kumpulkan HP
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Pengumpulan"
          value={stats.total}
          icon={Smartphone}
        />

        <StatCard
          title="Dikumpulkan"
          value={stats.dikumpulkan ?? 0}
          icon={Users}
        />

        <StatCard
          title="Disita"
          value={stats.disita ?? 0}
          icon={UserX}
        />

        <StatCard
          title="Dikembalikan"
          value={stats.dikembalikan ?? 0}
          icon={Undo2}
        />
      </div>

      <TableContainer>
        <DataTableHeader
          title="Riwayat Pengumpulan HP"
          description={`${collections.length} data`}
          search={
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="h-10 w-44 rounded-xl">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="dikumpulkan">Dikumpulkan</SelectItem>
                <SelectItem value="disita">Disita</SelectItem>
                <SelectItem value="dikembalikan">Dikembalikan</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        <DataTable
          data={collections}
          columns={columns}
          loading={isLoading}
          emptyMessage="Belum ada data pengumpulan HP."
        />
      </TableContainer>

      <HpBulkDialog
        open={bulkOpen}
        onOpenChange={setBulkOpen}
      />

      <HpReturnDialog
        open={returnOpen}
        onOpenChange={setReturnOpen}
        data={selected}
      />

      <HpDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        data={selected}
      />
    </div>
  );
}
