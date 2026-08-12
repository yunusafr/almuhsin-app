import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteTeacherAttendance } from "@/features/presensi-guru/hooks/use-teacher-attendances";

export default function PresensiGuruDeleteDialog({ open, onOpenChange, data }) {
  const deleteMutation = useDeleteTeacherAttendance();

  const handleDelete = async () => {
    if (!data) return;

    try {
      await deleteMutation.mutateAsync(data.id);

      toast.success("Data presensi guru berhasil dihapus");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Gagal menghapus data presensi guru.",
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data Presensi Guru</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus presensi{" "}
            <span className="font-semibold">
              {data?.teacher?.name ?? "Guru dihapus"}
            </span>{" "}
            ({data?.tanggal ?? "-"})? Tindakan ini tidak dapat
            dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
