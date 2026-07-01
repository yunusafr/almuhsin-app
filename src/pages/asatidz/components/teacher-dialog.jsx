import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TeacherForm from "./teacher-form";

import {
  useCreateTeacher,
  useUpdateTeacher,
} from "@/features/asatidz/hooks/use-teachers";

export default function TeacherDialog({ open, onOpenChange, data }) {
  const isEdit = !!data;

  const createMutation = useCreateTeacher();

  const updateMutation = useUpdateTeacher();

  const loading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: data.id,
          payload: values,
        });

        toast.success("Data asatidz berhasil diperbarui");
      } else {
        await createMutation.mutateAsync(values);

        toast.success("Data asatidz berhasil ditambahkan");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Terjadi kesalahan.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Asatidz" : "Tambah Asatidz"}
          </DialogTitle>
        </DialogHeader>

        <TeacherForm
          defaultValues={data}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
