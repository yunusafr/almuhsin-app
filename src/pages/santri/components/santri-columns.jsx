import StatusBadge from "@/components/common/status-badge";

import SantriRowAction from "./santri-row-action";

export const santriColumns = [
  {
    accessorKey: "nis",
    header: "NIS",
  },
  {
    accessorKey: "name",
    header: "Nama Santri",
  },
  {
    accessorKey: "rombel",
    header: "Rombel",
  },
  {
    accessorKey: "guardian_name",
    header: "Wali",
  },
  {
    accessorKey: "guardian_phone",
    header: "No HP",
  },
  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => (
      <StatusBadge>{row.original.status}</StatusBadge>
    ),
  },
  {
    id: "aksi",

    header: "Aksi",

    cell: ({ row }) => (
      <SantriRowAction santri={row.original} />
    ),
  },
];