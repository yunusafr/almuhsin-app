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

import { useDeleteStudentLeave } from "@/features/perizinan/hooks/use-student-leaves";

export default function PerizinanDeleteDialog({ open, onOpenChange, data }) {
  const deleteMutation = useDeleteStudentLeave();

  const handleDelete = async () => {
    if (!data) return;

    try {
      await deleteMutation.mutateAsync(data.id);

      toast.success("Data izin santri berhasil dihapus");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Gagal menghapus data izin santri.",
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data Izin Santri</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus izin{" "}
            <span className="font-semibold">
              {data?.student?.name ?? data?.student_name ?? "-"}
            </span>{" "}
            ({data?.tgl_keluar ?? "-"})? Tindakan ini tidak dapat
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
