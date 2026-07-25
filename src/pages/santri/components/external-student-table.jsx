import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Check,
  CheckCheck,
  RotateCcw,
} from "lucide-react";

import TableContainer from "@/components/data-table/table-container";
import DataTable from "@/components/data-table/data-table";
import DataTableHeader from "@/components/data-table/data-table-header";

import { externalStudentColumns } from "./external-student-columns";

export default function ExternalStudentTable({
  data = [],
  loading = false,
  selectedIds = [],
  onToggle,
  onToggleAll,
}) {
  const handleSelectAll = () => {
    onToggleAll(data);
  };

  const handleClearSelection = () => {
    onToggleAll([]);
  };

  return (
    <TableContainer className="border-0 shadow-none">
      <DataTableHeader
        title="Hasil Pencarian"
        description={`${data.length} data ditemukan`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                selectedIds.length
                  ? "default"
                  : "secondary"
              }
            >
              {selectedIds.length} dipilih
            </Badge>

            <Button
              size="sm"
              variant="outline"
              onClick={handleSelectAll}
              disabled={!data.length}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Pilih Semua
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleClearSelection}
              disabled={!selectedIds.length}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        }
      />

      <DataTable
        loading={loading}
        data={data}
        columns={externalStudentColumns({
          selectedIds,
          onToggle,
          onToggleAll,
        })}
        emptyMessage="Tidak ada data santri dari sistem pusat."
      />

      {selectedIds.length > 0 && (
        <div className="mt-4 flex items-center justify-end">
          <Badge className="gap-2 px-3 py-1">
            <Check className="h-3 w-3" />
            {selectedIds.length} santri dipilih
          </Badge>
        </div>
      )}
    </TableContainer>
  );
}