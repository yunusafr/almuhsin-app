import { toast } from "sonner";

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

import { Loader2 } from "lucide-react";

import { useDeleteTeacher } from "@/features/asatidz/hooks/use-teachers";

export default function TeacherDeleteDialog({ open, onOpenChange, data }) {
  const deleteMutation = useDeleteTeacher();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(data.id);

      toast.success("Data asatidz berhasil dihapus");

      onOpenChange(false);
    } catch (err) {
      toast.error(err.response?.data?.message ?? "Terjadi kesalahan");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Asatidz</AlertDialogTitle>

          <AlertDialogDescription>
            Yakin ingin menghapus
            <strong> {data?.name}</strong>
            ?
            <br />
            <br />
            Data yang sudah dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
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
