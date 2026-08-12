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

import { useDeleteSecurityGuard } from "@/features/security-guards/hooks/use-security-guards";

export default function SecurityGuardDeleteDialog({ open, onOpenChange, data }) {
  const deleteMutation = useDeleteSecurityGuard();

  const handleDelete = async () => {
    if (!data) return;

    try {
      await deleteMutation.mutateAsync(data.id);

      toast.success("Data satpam berhasil dihapus");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Gagal menghapus akun satpam.",
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Akun Satpam</AlertDialogTitle>

          <AlertDialogDescription>
            Hapus akun{" "}
            <span className="font-semibold">{data?.name ?? "-"}</span>?
            Semua token login akun ini akan dicabut dan akun tidak bisa
            login lagi. Tindakan ini tidak dapat dibatalkan.
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
