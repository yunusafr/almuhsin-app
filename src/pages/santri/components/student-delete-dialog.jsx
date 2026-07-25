import { useEffect } from "react";
import { Loader2 } from "lucide-react";

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

import { useDeleteStudent } from "@/features/santri/hooks/use-students";

export default function StudentDeleteDialog({
  open,
  onOpenChange,
  student,
}) {
  const deleteMutation = useDeleteStudent();

  const isLoading = deleteMutation.isPending;

  const handleDelete = () => {
    if (!student?.id) return;

    deleteMutation.mutate(student.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  useEffect(() => {
    if (!open) {
      deleteMutation.reset();
    }
  }, [open, deleteMutation]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus Data Santri
          </AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus data santri
            <span className="font-semibold">
              {" "}
              {student?.name}
            </span>
            ?
            <br />
            <br />
            Tindakan ini tidak dapat dibatalkan dan seluruh data
            yang terkait dengan santri akan ikut terhapus.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}