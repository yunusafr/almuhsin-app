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

import { useDeleteUser } from "@/features/users/hooks/use-users";

export default function UserDeleteDialog({ open, onOpenChange, data }) {
  const deleteMutation = useDeleteUser();

  const handleDelete = async () => {
    if (!data) return;

    try {
      await deleteMutation.mutateAsync(data.id);
      toast.success("Pengguna berhasil dihapus.");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Gagal menghapus pengguna.",
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Pengguna</AlertDialogTitle>

          <AlertDialogDescription>
            Hapus pengguna{" "}
            <span className="font-semibold">{data?.name ?? "-"}</span>? Semua
            token login akun ini akan dicabut. Tindakan ini tidak dapat
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
