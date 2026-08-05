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

import { useDeletePhoneCollection } from "@/features/hp/hooks/use-phone-collections";

export default function HpDeleteDialog({ open, onOpenChange, data }) {
  const deleteMutation = useDeletePhoneCollection();

  const handleDelete = async () => {
    if (!data) return;

    try {
      await deleteMutation.mutateAsync(data.id);

      toast.success("Data pengumpulan HP berhasil dihapus");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Gagal menghapus data pengumpulan HP.",
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data Pengumpulan HP</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus catatan pengumpulan HP{" "}
            <span className="font-semibold">
              {data?.student_name ?? data?.student?.name ?? "-"}
            </span>
            {data?.phone_name ? ` (${data.phone_name})` : ""}? Tindakan ini
            tidak dapat dibatalkan.
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
