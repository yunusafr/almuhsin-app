import { useMemo, useState } from "react";
import {
  Search,
  Loader2,
  Download,
} from "lucide-react";
import { toast } from "sonner";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ExternalStudentTable from "./external-student-table";

import {
  useExternalStudents,
  usePullExternalStudents,
} from "@/features/santri/hooks/use-students";

import { useDebounce } from "@/features/santri/hooks/use-debounce";

const TINGKAT_OPTIONS = [
  { label: "Semua Tingkat", value: "" },
  { label: "Tingkat 10", value: "10" },
  { label: "Tingkat 11", value: "11" },
  { label: "Tingkat 12", value: "12" },
];

export default function ExternalStudentDialog({
  open,
  onOpenChange,
}) {
  const [keyword, setKeyword] = useState("");
  const [tingkat, setTingkat] = useState("");

  const debouncedKeyword = useDebounce(keyword, 500);

  const [selectedIds, setSelectedIds] = useState([]);

  const {
    data = [],
    isLoading,
  } = useExternalStudents(debouncedKeyword, tingkat);

  const pullMutation = usePullExternalStudents();

  // Pilihan dari hasil pencarian lama tidak relevan dengan keyword
  // baru — reset begitu user mulai mengetik ulang.
  const handleKeywordChange = (value) => {
    setKeyword(value);
    setSelectedIds([]);
  };

  /*
  |--------------------------------------------------------------------------
  | Normalisasi data eksternal
  |--------------------------------------------------------------------------
  | Data dari sistem eksternal tidak selalu memiliki field `id` (identitas
  | utamanya bisa `nis`). Tanpa id unik, semua baris berbagi id undefined
  | sehingga mencentang satu baris akan mencentang semua baris.
  */

  const normalizedData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      id: item.id ?? item.nis ?? `ext-${index}`,
    }));
  }, [data]);

  const selectedData = useMemo(() => {
    return normalizedData.filter((item) =>
      selectedIds.includes(item.id)
    );
  }, [normalizedData, selectedIds]);

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
      status: student.status ?? "aktif",
    }));

    pullMutation.mutate(
      {
        students,
      },
      {
        onSuccess: (result) => {
          const imported = result?.data?.imported ?? students.length;

          toast.success(
            `${imported} santri berhasil ditarik dari sistem pusat`,
          );

          setSelectedIds([]);
          setKeyword("");
          setTingkat("");
          onOpenChange(false);
        },

        onError: (error) => {
          toast.error(
            error?.response?.data?.message ??
              "Gagal menarik data santri. Periksa koneksi ke sistem pusat.",
          );
        },
      }
    );
  }

  function handleClose(value) {
    if (!value) {
      setKeyword("");
      setTingkat("");
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

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={keyword}
            onChange={(e) =>
              handleKeywordChange(e.target.value)
            }
            placeholder="Cari berdasarkan NIS atau Nama (min. 2 karakter)..."
            className="h-10 pl-9"
          />

          <Select
            value={tingkat}
            onValueChange={(value) => {
              setTingkat(value);
              setSelectedIds([]);
            }}
          >
            <SelectTrigger className="mt-2 h-10 w-full rounded-xl">
              <SelectValue placeholder="Semua Tingkat" />
            </SelectTrigger>

            <SelectContent>
              {TINGKAT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <ExternalStudentTable
          data={normalizedData}
          loading={isLoading}
          searching={keyword.trim().length < 2}
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