import { useMemo, useState } from "react";
import {
  Search,
  Loader2,
  Download,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ExternalStudentTable from "./external-student-table";

import {
  useExternalStudents,
  usePullExternalStudents,
} from "@/features/santri/hooks/use-students";

import { useDebounce } from "@/features/santri/hooks/use-debounce";

export default function ExternalStudentDialog({
  open,
  onOpenChange,
}) {
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword, 500);

  const [selectedIds, setSelectedIds] = useState([]);

  const {
    data = [],
    isLoading,
  } = useExternalStudents(debouncedKeyword);

  const pullMutation = usePullExternalStudents();

  const selectedData = useMemo(() => {
    return data.filter((item) =>
      selectedIds.includes(item.id)
    );
  }, [data, selectedIds]);

  function handleToggle(id) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function handleToggleAll(rows) {
    if (!rows.length) {
      setSelectedIds([]);
      return;
    }

    const ids = rows.map((row) => row.id);

    const allSelected = ids.every((id) =>
      selectedIds.includes(id)
    );

    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(ids);
    }
  }

  function handleImport() {
    const students = selectedData.map((student) => ({
      nis: student.nis,
      name: student.name,
      birth_place: student.birth_place,
      birth_date: student.birth_date,
      address: student.address,
      guardian_name: student.guardian_name,
      guardian_phone: student.guardian_phone,
      rombel: student.rombel,
      tingkat: student.tingkat,
      status: student.status,
    }));

    pullMutation.mutate(
      {
        students,
      },
      {
        onSuccess: () => {
          setSelectedIds([]);
          setKeyword("");
          onOpenChange(false);
        },
      }
    );
  }

  function handleClose(value) {
    if (!value) {
      setKeyword("");
      setSelectedIds([]);
    }

    onOpenChange(value);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>
            Tarik Data Santri
          </DialogTitle>

          <DialogDescription>
            Cari data santri dari sistem pusat,
            kemudian pilih santri yang akan
            diimpor ke aplikasi.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3">
          <Input
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
            placeholder="Cari berdasarkan NIS atau Nama..."
          />

          <Button
            variant="outline"
            disabled
          >
            <Search className="mr-2 h-4 w-4" />
            Cari
          </Button>
        </div>

        <Separator />

        <ExternalStudentTable
          data={data}
          loading={isLoading}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
        />

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedData.length} santri dipilih
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Batal
            </Button>

            <Button
              onClick={handleImport}
              disabled={
                !selectedData.length ||
                pullMutation.isPending
              }
            >
              {pullMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengimpor...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Import {selectedData.length} Santri
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}