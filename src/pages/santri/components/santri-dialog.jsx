import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SantriForm from "./santri-form";

import {
  useCreateStudent,
  useUpdateStudent,
} from "@/features/santri/hooks/use-students";

export default function SantriDialog({
  open,
  onOpenChange,
  data,
}) {
  const createMutation = useCreateStudent();

  const updateMutation = useUpdateStudent();

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending;

  const handleSubmit = (values) => {
    const mutation = data
      ? updateMutation
      : createMutation;

    const payload = data
      ? {
          id: data.id,
          payload: values,
        }
      : values;

    mutation.mutate(payload, {
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
  }, [
    open,
    createMutation,
    updateMutation,
  ]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            {data
              ? "Edit Data Santri"
              : "Tambah Santri"}
          </DialogTitle>

          <DialogDescription>
            {data
              ? "Perbarui informasi data santri."
              : "Lengkapi informasi santri baru."}
          </DialogDescription>
        </DialogHeader>

        <SantriForm
    key={data?.id ?? "new"}
    defaultValues={data}
    loading={isLoading}
    onSubmit={handleSubmit}
    onCancel={() => onOpenChange(false)}
/>
      </DialogContent>
    </Dialog>
  );
}