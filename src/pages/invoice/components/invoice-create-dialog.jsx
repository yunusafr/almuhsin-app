import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import FormWrapper from "@/components/form/form-wrapper";
import FormSection from "@/components/form/form-section";
import FormGrid from "@/components/form/form-grid";
import FormSelect from "@/components/form/form-select";
import FormDatePicker from "@/components/form/form-date-picker";
import FormInput from "@/components/form/form-input";
import FormActions from "@/components/form/form-actions";
import StatusBadge from "@/components/common/status-badge";
import EmptyState from "@/components/common/empty-state";

import { useStudents } from "@/features/santri/hooks/use-students";
import { useCreateInvoices } from "@/features/keuangan/hooks/use-invoices";

import {
  createInvoiceSchema,
  INVOICE_ITEM_TYPES,
} from "@/features/keuangan/schemas/invoice-schema";

import { cn, formatCurrency } from "@/lib/utils";

const INITIAL_VALUES = {
  student_ids: [],
  due_date: format(new Date(), "yyyy-MM-dd"),
  items: [
    {
      type: "SPP_NORMAL",
      description: "",
      amount: "",
    },
  ],
};

export default function InvoiceCreateDialog({ open, onOpenChange }) {
  const { data: students = [] } = useStudents({ per_page: 1000 });

  const createMutation = useCreateInvoices();

  const [studentSearch, setStudentSearch] = useState("");

  const form = useForm({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: INITIAL_VALUES,
  });

  const { control, watch, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");
  const selectedIds = watch("student_ids") ?? [];

  useEffect(() => {
    if (!open) {
      form.reset(INITIAL_VALUES);
      setStudentSearch("");
    }
  }, [open, form]);

  const filteredStudents = useMemo(() => {
    const keyword = studentSearch.trim().toLowerCase();

    if (!keyword) return students;

    return students.filter(
      (student) =>
        student.name?.toLowerCase().includes(keyword) ||
        student.nis?.toLowerCase().includes(keyword) ||
        student.rombel?.toLowerCase().includes(keyword),
    );
  }, [students, studentSearch]);

  function toggleStudent(id) {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];

    setValue("student_ids", next, { shouldDirty: true });
  }

  const totalPerStudent = useMemo(() => {
    return (watchedItems ?? []).reduce(
      (acc, item) => acc + (Number(item.amount) || 0),
      0,
    );
  }, [watchedItems]);

  const handleSubmit = async (values) => {
    try {
      const items = values.items.map((item) => ({
        type: item.type,
        ...(item.description ? { description: item.description } : {}),
        amount: Number(item.amount),
      }));

      const payload = {
        invoices: values.student_ids.map((studentId) => ({
          student_id: studentId,
          due_date: values.due_date,
          items,
        })),
      };

      await createMutation.mutateAsync(payload);

      toast.success(`Berhasil membuat ${payload.invoices.length} tagihan`);

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Gagal membuat tagihan.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Buat Tagihan Baru</DialogTitle>

          <DialogDescription>
            Buat tagihan masal untuk satu atau banyak santri sekaligus.
          </DialogDescription>
        </DialogHeader>

        <FormWrapper
          form={form}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormSection
            title="Pilih Santri"
            description={`${selectedIds.length} santri dipilih`}
          >
            <div className="mb-4 max-w-sm">
              <Input
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Cari NIS, nama atau rombel..."
                className="h-10 rounded-xl"
              />
            </div>

            {filteredStudents.length === 0 ? (
              <EmptyState
                title="Tidak ada santri"
                description="Belum ada data santri yang dapat ditagih."
              />
            ) : (
              <div className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
                {filteredStudents.map((student) => {
                  const checked = selectedIds.includes(student.id);

                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => toggleStudent(student.id)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition",
                        checked
                          ? "border-green-300 bg-green-50 dark:border-green-500/30 dark:bg-green-500/10"
                          : "border-border hover:bg-muted/60",
                      )}
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">{student.name}</p>

                        <p className="text-xs text-muted-foreground">
                          {student.nis ?? "-"}
                          {student.rombel ? ` • ${student.rombel}` : ""}
                        </p>
                      </div>

                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold",
                          checked
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-muted-foreground/40 text-transparent",
                        )}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </FormSection>

          <FormSection
            title="Item Tagihan"
            description="Jenis biaya yang akan ditagihkan."
          >
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid gap-3 rounded-2xl border p-4 md:grid-cols-[1fr_1.4fr_1fr_auto]"
                >
                  <FormSelect
                    control={control}
                    name={`items.${index}.type`}
                    label="Jenis"
                    options={INVOICE_ITEM_TYPES}
                  />

                  <FormInput
                    control={control}
                    name={`items.${index}.description`}
                    label="Keterangan"
                    placeholder="SPP Bulan Juli..."
                  />

                  <FormInput
                    control={control}
                    name={`items.${index}.amount`}
                    label="Nominal (Rp)"
                    type="number"
                    placeholder="250000"
                  />

                  <div className="flex items-end pb-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/10"
                      disabled={fields.length <= 1}
                      onClick={() => remove(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              className="mt-3"
              onClick={() =>
                append({ type: "SPP_NORMAL", description: "", amount: "" })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Item
            </Button>

            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-muted/50 p-4">
              <Users size={16} className="text-muted-foreground" />

              <span className="text-sm text-muted-foreground">
                {selectedIds.length} santri ×{" "}
                {formatCurrency(totalPerStudent)} / santri
              </span>

              <span className="ml-auto flex items-center gap-2 text-sm font-semibold">
                Total Tagihan
                <StatusBadge color="green">
                  {formatCurrency(totalPerStudent * selectedIds.length)}
                </StatusBadge>
              </span>
            </div>
          </FormSection>

          <FormSection
            title="Jatuh Tempo"
            description="Batas waktu pembayaran tagihan."
          >
            <FormGrid cols={1}>
              <FormDatePicker
                control={control}
                name="due_date"
                label="Tanggal Jatuh Tempo"
              />
            </FormGrid>
          </FormSection>

          <FormActions
            loading={createMutation.isPending}
            submitLabel="Buat Tagihan"
            cancelLabel="Batal"
            onCancel={() => onOpenChange(false)}
          />
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
