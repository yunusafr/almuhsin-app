import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  FormWrapper,
  FormSection,
  FormGrid,
  FormSelect,
  FormInput,
  FormTextarea,
  FormActions,
} from "@/components/form";

import { phoneCollectionBulkSchema } from "@/features/hp/schemas/phone-collection-schema";
import { useCreateBulkPhoneCollection } from "@/features/hp/hooks/use-phone-collections";
import { useStudents } from "@/features/santri/hooks/use-students";

const INITIAL_VALUES = {
  phone_name: "",
  status: "dikumpulkan",
  notes: "",
  student_ids: [],
};

const STATUS_OPTIONS = [
  { label: "Dikumpulkan", value: "dikumpulkan" },
  { label: "Disita", value: "disita" },
];

export default function HpBulkDialog({ open, onOpenChange }) {
  const [studentKeyword, setStudentKeyword] = useState("");

  const createMutation = useCreateBulkPhoneCollection();

  const { data: students = [] } = useStudents();

  const filteredStudents = useMemo(() => {
    const keyword = studentKeyword.toLowerCase();

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(keyword) ||
        (student.nis ?? "").toLowerCase().includes(keyword),
    );
  }, [students, studentKeyword]);

  const form = useForm({
    resolver: zodResolver(phoneCollectionBulkSchema),
    values: INITIAL_VALUES,
  });

  const selectedIds = form.watch("student_ids") ?? [];

  function toggleStudent(id) {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];

    form.setValue("student_ids", next, { shouldValidate: true });
  }

  const handleSubmit = async (values) => {
    try {
      const studentsPayload = selectedIds.map((id) => ({
        student_id: id,
        phone_name: values.phone_name,
        status: values.status,
        ...(values.notes ? { notes: values.notes } : {}),
      }));

      await createMutation.mutateAsync({
        students: studentsPayload,
      });

      toast.success(
        `${selectedIds.length} HP santri berhasil dikumpulkan`,
      );

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Gagal mengumpulkan HP santri.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pengumpulan HP Santri</DialogTitle>

          <DialogDescription>
            Mencatat HP santri yang dikumpulkan (rutinitas malam/belajar)
            atau disita karena pelanggaran.
          </DialogDescription>
        </DialogHeader>

        <FormWrapper form={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <FormSection title="Detail HP">
            <FormGrid>
              <FormInput
                control={form.control}
                name="phone_name"
                label="Nama HP"
                placeholder="Samsung Galaxy A54"
              />

              <FormSelect
                control={form.control}
                name="status"
                label="Status"
                options={STATUS_OPTIONS}
              />
            </FormGrid>

            <FormTextarea
              control={form.control}
              name="notes"
              label="Catatan (opsional)"
              placeholder="Misal: HP disita karena menyembunyikan di lemari"
              rows={2}
            />
          </FormSection>

          <FormSection title="Pilih Santri">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={studentKeyword}
                onChange={(e) => setStudentKeyword(e.target.value)}
                placeholder="Cari santri..."
                className="h-10 rounded-xl pl-9"
              />
            </div>

            <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border p-2">
              {filteredStudents.length === 0 ? (
                <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                  Tidak ada santri.
                </p>
              ) : (
                filteredStudents.map((student) => {
                  const checked = selectedIds.includes(student.id);

                  return (
                    <label
                      key={student.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-muted/60"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleStudent(student.id)}
                      />

                      <span className="text-sm font-medium">
                        {student.name}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {student.rombel ? `${student.rombel} · ` : ""}
                        {student.nis ?? ""}
                      </span>
                    </label>
                  );
                })
              )}
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {selectedIds.length} santri dipilih
            </p>
          </FormSection>

          <FormActions
            loading={createMutation.isPending}
            submitLabel="Kumpulkan HP"
            onCancel={() => onOpenChange(false)}
          />
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
