import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AttendanceForm from "./attendance-form";

import { useCreateAttendance } from "@/features/presensi/hooks/use-attendances";

export default function AttendanceDialog({ open, onOpenChange }) {
  const createMutation = useCreateAttendance();

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        class_id: values.class_id || undefined,
        sub_type: values.sub_type || undefined,
        students: values.students
          .filter((item) => item.student_id)
          .map((item) => ({
            student_id: item.student_id,
            status: item.status,
            ...(item.notes ? { notes: item.notes } : {}),
          })),
      };

      await createMutation.mutateAsync(payload);

      toast.success("Presensi berhasil disimpan");

      onOpenChange(false);
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Gagal menyimpan presensi.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Input Presensi</DialogTitle>

          <DialogDescription>
            Catat kehadiran santri untuk kegiatan hari ini.
          </DialogDescription>
        </DialogHeader>

        <AttendanceForm
          loading={createMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
