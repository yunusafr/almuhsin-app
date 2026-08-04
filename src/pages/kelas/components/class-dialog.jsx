import { useEffect } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import ClassForm from "./class-form";

import {
  useCreateClass,
  useUpdateClass,
} from "@/features/kelas/hooks/use-classes";

export default function ClassDialog({ open, onOpenChange, data }) {
  const createMutation = useCreateClass();

  const updateMutation = useUpdateClass();

  const loading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (values) => {
    try {
      if (data) {
        await updateMutation.mutateAsync({
          id: data.id,
          payload: {
            ...values,
            level: values.level || undefined,
          },
        });

        toast.success("Master kelas berhasil diperbarui");
      } else {
        await createMutation.mutateAsync({
          ...values,
          level: values.level || undefined,
        });

        toast.success("Master kelas berhasil ditambahkan");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          (data
            ? "Gagal memperbarui master kelas."
            : "Gagal menambahkan master kelas."),
      );
    }
  };

  useEffect(() => {
    if (!open) {
      createMutation.reset();
      updateMutation.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {data ? "Edit Master Kelas" : "Tambah Master Kelas"}
          </DialogTitle>

          <DialogDescription>
            {data
              ? "Perbarui data kelas pondok."
              : "Tambahkan kelas pondok baru."}
          </DialogDescription>
        </DialogHeader>

        <ClassForm
          defaultValues={data}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
