import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PerizinanForm from "./perizinan-form";

import { useCreateStudentLeave } from "@/features/perizinan/hooks/use-student-leaves";

export default function PerizinanDialog({ open, onOpenChange }) {
  const createMutation = useCreateStudentLeave();

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        tgl_kembali: values.tgl_kembali || null,
        jam_kembali: values.jam_kembali || null,
      };

      await createMutation.mutateAsync(payload);

      toast.success("Izin santri berhasil ditambahkan");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Gagal menambahkan izin santri."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Tambah Izin Santri</DialogTitle>

          <DialogDescription>
            Catat izin keluar santri beserta jadwal kembali (jika sudah
            diketahui).
          </DialogDescription>
        </DialogHeader>

        <PerizinanForm
          loading={createMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
