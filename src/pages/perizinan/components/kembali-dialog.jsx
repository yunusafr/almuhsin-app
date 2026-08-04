import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  FormWrapper,
  FormSection,
  FormGrid,
  FormInput,
  FormDatePicker,
  FormActions,
} from "@/components/form";

import { kembaliSchema } from "@/features/perizinan/schemas/student-leave-schema";
import { useUpdateStudentLeave } from "@/features/perizinan/hooks/use-student-leaves";

const INITIAL_VALUES = {
  tgl_kembali: format(new Date(), "yyyy-MM-dd"),
  jam_kembali: "17:00",
};

export default function KembaliDialog({ open, onOpenChange, data }) {
  const updateMutation = useUpdateStudentLeave();

  const form = useForm({
    resolver: zodResolver(kembaliSchema),
    defaultValues: INITIAL_VALUES,
  });

  useEffect(() => {
    if (open) {
      form.reset(INITIAL_VALUES);
    }
  }, [open, form]);

  const handleSubmit = async (values) => {
    try {
      await updateMutation.mutateAsync({
        id: data.id,
        tgl_kembali: values.tgl_kembali,
        jam_kembali: values.jam_kembali,
      });

      toast.success("Izin santri berhasil diupdate");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Gagal mengupdate izin santri."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Santri Kembali</DialogTitle>

          <DialogDescription>
            Catat tanggal dan jam kembalinya{" "}
            {data?.student?.name ?? "santri"}.
          </DialogDescription>
        </DialogHeader>

        <FormWrapper form={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <FormSection>
            <FormGrid>
              <FormDatePicker
                control={form.control}
                name="tgl_kembali"
                label="Tanggal Kembali"
              />

              <FormInput
                control={form.control}
                name="jam_kembali"
                label="Jam Kembali"
                type="time"
              />
            </FormGrid>
          </FormSection>

          <FormActions
            loading={updateMutation.isPending}
            submitLabel="Simpan Kembali"
            onCancel={() => onOpenChange(false)}
          />
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
