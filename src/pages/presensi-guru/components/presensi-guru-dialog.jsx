import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PresensiGuruForm from "./presensi-guru-form";

import {
  useCreateTeacherAttendance,
  useUpdateTeacherAttendance,
} from "@/features/presensi-guru/hooks/use-teacher-attendances";

export default function PresensiGuruDialog({ open, onOpenChange, data }) {
  const isEdit = !!data;

  const createMutation = useCreateTeacherAttendance();
  const updateMutation = useUpdateTeacherAttendance();

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: data.id,
          keterangan: values.keterangan,
          keterangan_tambahan: values.keterangan_tambahan || undefined,
        });

        toast.success("Presensi guru berhasil diupdate");
      } else {
        const payload = {
          ...values,
          kelas_diisi: values.kelas_diisi || undefined,
          keterangan_tambahan: values.keterangan_tambahan || undefined,
        };

        await createMutation.mutateAsync(payload);

        toast.success("Presensi guru berhasil ditambahkan");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          (isEdit
            ? "Gagal mengupdate presensi guru."
            : "Gagal menambahkan presensi guru."),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Presensi Guru" : "Tambah Presensi Guru"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Perbarui keterangan kehadiran guru."
              : "Catat kehadiran guru pada hari ini."}
          </DialogDescription>
        </DialogHeader>

        <PresensiGuruForm
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
