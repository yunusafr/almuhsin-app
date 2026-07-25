import { Checkbox } from "@/components/ui/checkbox";

export const externalStudentColumns = ({
  selectedIds,
  onToggle,
  onToggleAll,
}) => [
  {
    id: "select",

    header: ({ table }) => {
      const rows = table.options.data ?? [];

      const checked =
        rows.length > 0 &&
        rows.every((row) => selectedIds.includes(row.id));

      return (
        <Checkbox
          checked={checked}
          onCheckedChange={() => onToggleAll(rows)}
          aria-label="Pilih Semua"
        />
      );
    },

    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.id)}
        onCheckedChange={() =>
          onToggle(row.original.id)
        }
        aria-label="Pilih"
      />
    ),

    enableSorting: false,
    enableHiding: false,

    size: 40,
  },

  {
    accessorKey: "nis",

    header: "NIS",

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.nis}
      </span>
    ),
  },

  {
    accessorKey: "name",

    header: "Nama Santri",

    cell: ({ row }) => (
      <div>
        <p className="font-medium">
          {row.original.name}
        </p>

        {row.original.gender && (
          <p className="text-xs text-muted-foreground">
            {row.original.gender === "L"
              ? "Laki-laki"
              : "Perempuan"}
          </p>
        )}
      </div>
    ),
  },

  {
    accessorKey: "rombel",

    header: "Rombel",

    cell: ({ row }) =>
      row.original.rombel ?? "-",
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;

      const color = {
        aktif:
          "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",

        lulus:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",

        keluar:
          "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",

        mutasi:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
      };

      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            color[status] ??
            "bg-muted text-muted-foreground"
          }`}
        >
          {status ?? "-"}
        </span>
      );
    },
  },
];