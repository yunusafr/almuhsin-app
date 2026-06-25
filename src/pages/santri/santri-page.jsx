import { Button } from "@/components/ui/button";

import { useState } from "react";

import DataTable from "@/components/data-table/data-table";
import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";

import StatusBadge from "@/components/common/status-badge";
import PageHeader from "@/components/common/page-header";

const data = [
  {
    nis: "2026001",
    nama: "Ahmad Fauzi",
    kelas: "XI RPL",
    status: "Aktif",
  },
  {
    nis: "2026002",
    nama: "Muhammad Rizki",
    kelas: "X RPL",
    status: "Aktif",
  },
];

const columns = [
  {
    accessorKey: "nis",
    header: "NIS",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => <StatusBadge>Aktif</StatusBadge>,
  },
];

export default function SantriPage() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((santri) => {
    const keyword = search.toLowerCase();

    return (
      santri.nis.toLowerCase().includes(keyword) ||
      santri.nama.toLowerCase().includes(keyword) ||
      santri.kelas.toLowerCase().includes(keyword) ||
      santri.status.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Santri"
        description="Kelola seluruh data santri pondok"
        actions={<Button>Tambah Santri</Button>}
      />

      <TableContainer>
        <DataTableHeader
          title="Daftar Santri"
          description={`Total ${filteredData.length} santri`}
          search={
            <DataTableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari santri..."
            />
          }
        />

        <DataTable data={filteredData} columns={columns} />
      </TableContainer>
    </div>
  );
}
