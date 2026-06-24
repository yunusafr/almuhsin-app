import PageHeader from "@/components/common/page-header";
import DataTable from "@/components/data-table/data-table";

import { santriData } from "@/features/santri/data/dummy-santri";

export default function SantriPage() {
  const columns = [
    {
      key: "nis",
      label: "NIS",
    },

    {
      key: "nama",
      label: "Nama",
    },

    {
      key: "kelas",
      label: "Kelas",
    },

    {
      key: "status",
      label: "Status",
    },
  ];

  return (
    <>
      <PageHeader
        title="Data Santri"
        description="Kelola seluruh data santri"
      />

      <DataTable columns={columns} data={santriData} />
    </>
  );
}
