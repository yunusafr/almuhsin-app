import { useEffect } from "react";

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

  const handleSubmit = (values) => {
    if (data) {
      updateMutation.mutate(
        {
          id: data.id,
          payload: values,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        },
      );

      return;
    }

    createMutation.mutate(values, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
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
              ? "Perbarui data master kelas."
              : "Tambahkan master kelas baru."}
          </DialogDescription>
        </DialogHeader>

        <ClassForm
          defaultValues={data}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
