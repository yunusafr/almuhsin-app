import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import SantriForm from "./santri-form";

import {
  useCreateStudents,
  useUpdateStudents,
} from "@/features/santri/hooks/use-students";

export default function StudentsDialog({ open, onOpenChange, data }) {
  const createMutation = useCreateStudents();

  const updateMutation = useUpdateStudents();

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
      <DialogContent className="max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>
            {data ? "Edit Data Santri" : "Tambah Santri"}
          </DialogTitle>

          <DialogDescription>
            {data ? "Perbarui informasi santri." : "Masukkan data santri baru."}
          </DialogDescription>
        </DialogHeader>

        <SantriForm
          defaultValues={data}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
