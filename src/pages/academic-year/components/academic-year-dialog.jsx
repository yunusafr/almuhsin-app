import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AcademicYearForm from "./academic-year-form";

import {
  useCreateAcademicYear,
  useUpdateAcademicYear,
} from "@/features/academic-year/hooks/use-academic-year";

export default function AcademicYearDialog({
  open,
  onOpenChange,
  data = null,
}) {
  const createMutation = useCreateAcademicYear();
  const updateMutation = useUpdateAcademicYear();

  const isEdit = Boolean(data);

  const loading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (values) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: data.id,
          payload: values,
        },
        {
          onSuccess: (res) => {
            toast.success(res.message ?? "Tahun pelajaran berhasil diperbarui");

            onOpenChange(false);
          },

          onError: (err) => {
            toast.error(
              err.response?.data?.message ??
                "Gagal memperbarui tahun pelajaran",
            );
          },
        },
      );

      return;
    }

    createMutation.mutate(values, {
      onSuccess: (res) => {
        toast.success(res.message ?? "Tahun pelajaran berhasil ditambahkan");

        onOpenChange(false);
      },

      onError: (err) => {
        toast.error(
          err.response?.data?.message ?? "Gagal menambahkan tahun pelajaran",
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Tahun Pelajaran" : "Tambah Tahun Pelajaran"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Perbarui informasi tahun pelajaran."
              : "Tambahkan tahun pelajaran baru."}
          </DialogDescription>
        </DialogHeader>

        <AcademicYearForm
          defaultValues={data}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
