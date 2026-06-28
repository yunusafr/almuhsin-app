import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

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

import { useDeleteAcademicYear } from "@/features/academic-year/hooks/use-academic-year";

export default function AcademicYearDeleteDialog({ open, onOpenChange, data }) {
  const deleteMutation = useDeleteAcademicYear();

  const handleDelete = () => {
    if (!data) return;

    deleteMutation.mutate(data.id, {
      onSuccess: (res) => {
        toast.success(res.message ?? "Tahun pelajaran berhasil dihapus");

        onOpenChange(false);
      },

      onError: (err) => {
        toast.error(
          err.response?.data?.message ?? "Gagal menghapus tahun pelajaran",
        );
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>

          <AlertDialogTitle className="text-center">
            Hapus Tahun Pelajaran
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center">
            Apakah yakin ingin menghapus
            <br />
            <span className="font-semibold text-foreground">{data?.name}</span>
            ?
            <br />
            <br />
            Data yang sudah dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
