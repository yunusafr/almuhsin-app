import { useState } from "react";
import { toast } from "sonner";
import { Undo2 } from "lucide-react";

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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useReturnPhoneCollection } from "@/features/hp/hooks/use-phone-collections";

export default function HpReturnDialog({ open, onOpenChange, data }) {
  const returnMutation = useReturnPhoneCollection();

  const [notes, setNotes] = useState("");

  const handleReturn = async () => {
    if (!data) return;

    try {
      await returnMutation.mutateAsync({
        id: data.id,
        payload: {
          status: "dikembalikan",
          ...(notes ? { notes } : {}),
        },
      });

      toast.success(`HP ${data.phone_name ?? ""} berhasil dikembalikan`);

      setNotes("");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Gagal mengembalikan HP.",
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kembalikan HP Santri</AlertDialogTitle>

          <AlertDialogDescription>
            Kembalikan HP{" "}
            <span className="font-semibold">
              {data?.student_name ?? data?.student?.name ?? "-"}
            </span>
            {data?.phone_name ? ` (${data.phone_name})` : ""} ke santri.
            Sistem otomatis mencatat waktu dan petugas pengembalian.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Label htmlFor="return-notes">Catatan (opsional)</Label>

          <Input
            id="return-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Misal: Diambil jam 7 pagi"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <AlertDialogAction
            disabled={returnMutation.isPending}
            onClick={handleReturn}
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Kembalikan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
