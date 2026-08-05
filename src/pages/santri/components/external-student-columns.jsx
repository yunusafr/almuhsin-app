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
    accessorKey: "tingkat",

    header: "Tingkat",

    cell: ({ row }) => {
      const tingkat = row.original.tingkat;

      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            tingkat
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {tingkat ? `Tingkat ${tingkat}` : "-"}
        </span>
      );
    },
  },
];