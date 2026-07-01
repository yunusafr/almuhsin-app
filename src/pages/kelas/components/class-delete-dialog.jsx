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

import { useDeleteClass } from "@/features/kelas/hooks/use-classes";

export default function ClassDeleteDialog({ open, onOpenChange, data }) {
  const deleteMutation = useDeleteClass();

  const handleDelete = () => {
    if (!data) return;

    deleteMutation.mutate(data.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Master Kelas</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus
            <span className="font-semibold"> {data?.name}</span>
            ?
            <br />
            <br />
            <span className="text-red-500 font-medium">
              Menghapus master kelas juga dapat mempengaruhi data santri yang
              pernah terhubung dengan kelas ini.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
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
