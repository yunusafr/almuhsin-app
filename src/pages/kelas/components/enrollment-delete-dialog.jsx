import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { useDeleteEnrollment } from "@/features/enrollment/hooks/use-enrollments";

export default function EnrollmentDeleteDialog({
  open,
  onOpenChange,
  data,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMutation = useDeleteEnrollment();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteMutation.mutateAsync(data.id);

      toast.success("Data plotting santri berhasil dihapus");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Gagal menghapus data plotting."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus Plotting Santri</DialogTitle>

          <DialogDescription>
            Yakin ingin menghapus plotting{" "}
            <span className="font-medium text-foreground">
              {data?.student?.name ?? "santri"}
            </span>{" "}
            dari kelas{" "}
            <span className="font-medium text-foreground">
              {data?.class_room?.name ?? data?.classRoom?.name ?? "kelas"}
            </span>
            ? Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Batal
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
