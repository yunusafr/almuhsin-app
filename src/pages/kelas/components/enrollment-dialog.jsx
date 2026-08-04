import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EnrollmentForm from "./enrollment-form";

import {
  useCreateEnrollment,
  useUpdateEnrollment,
} from "@/features/enrollment/hooks/use-enrollments";

export default function EnrollmentDialog({ open, onOpenChange, data }) {
  const isEdit = !!data;

  const createMutation = useCreateEnrollment();
  const updateMutation = useUpdateEnrollment();

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: data.id,
          payload: values,
        });

        toast.success("Data plotting berhasil diperbarui");
      } else {
        await createMutation.mutateAsync(values);

        toast.success("Santri berhasil diploting ke kelas");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          (isEdit
            ? "Gagal memperbarui data plotting."
            : "Gagal plotting santri ke kelas."),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Plotting Santri" : "Plotting Santri"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Perbarui penempatan santri pada kelas pondok."
              : "Plotting satu santri ke kelas pondok pada tahun ajaran tertentu."}
          </DialogDescription>
        </DialogHeader>

        <EnrollmentForm
          data={data}
          loading={
            isEdit ? updateMutation.isPending : createMutation.isPending
          }
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
