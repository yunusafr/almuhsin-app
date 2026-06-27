import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import PageHeader from "@/components/common/page-header";

import TableContainer from "@/components/data-table/table-container";
import DataTable from "@/components/data-table/data-table";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";

import {useStudents} from "@/features/santri/hooks/use-students";
import { santriColumns } from "@/pages/santri/components/santri-columns";

export default function SantriPage() {
  const [search, setSearch] = useState("");
  const [open,setOpen]=useState(false);

  const {
    data = [],
    isLoading,
    refetch
  } = useStudents();

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) => {
      return (
        item.nis.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.rombel.toLowerCase().includes(keyword) ||
        item.guardian_name.toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Santri"
        description="Kelola seluruh data santri pondok"
        actions={
          <div className="flex gap-2">
          <Button
              variant="outline"
              onClick={refetch}
            >
              <RefreshCw className="mr-2 h-4 w-4" />

              Refresh
            </Button>

          <Button onClick={()=>setOpen(true)}>
            Tambah Santri
        </Button>
        </div>
        }
      />

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
              placeholder="Cari santri..."
            />
          }
        />

        <DataTable
          data={filteredData}
          columns={santriColumns}
          loading={isLoading}
        />
      </TableContainer>
    </div>
  );
}