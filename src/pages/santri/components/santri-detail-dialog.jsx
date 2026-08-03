import { format } from "date-fns";
import { id } from "date-fns/locale";
import { UserRound } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StatusBadge from "@/components/common/status-badge";

const STATUS_META = {
  aktif: { label: "Aktif", color: "green" },
  lulus: { label: "Lulus", color: "blue" },
  keluar: { label: "Keluar", color: "red" },
  mutasi: { label: "Mutasi", color: "yellow" },
};

function formatBirthDate(value) {
  if (!value) return "-";

  try {
    return format(new Date(value), "dd MMMM yyyy", { locale: id });
  } catch {
    return value;
  }
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-2xl bg-muted/40 px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 font-medium break-words">{value || "-"}</p>
    </div>
  );
}

export default function SantriDetailDialog({ open, onOpenChange, student }) {
  const meta = student ? STATUS_META[student.status] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRound size={18} className="text-primary" />

            {student?.name ?? "Detail Santri"}
          </DialogTitle>

          <DialogDescription>
            Informasi lengkap data santri.
          </DialogDescription>
        </DialogHeader>

        {student && (
          <div className="space-y-6">
            {/* Identitas */}
            <div>
              <h3 className="mb-3 font-semibold">Identitas Santri</h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <DetailRow label="NIS" value={student.nis} />
                <DetailRow label="Nama Lengkap" value={student.name} />
                <DetailRow label="Tempat Lahir" value={student.birth_place} />
                <DetailRow label="Tanggal Lahir" value={formatBirthDate(student.birth_date)} />
                <DetailRow label="Tingkat" value={student.tingkat} />
                <DetailRow label="Rombel" value={student.rombel} />
              </div>
            </div>

            {/* Wali & Alamat */}
            <div>
              <h3 className="mb-3 font-semibold">Wali & Alamat</h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <DetailRow label="Nama Wali" value={student.guardian_name} />
                <DetailRow label="No. HP Wali" value={student.guardian_phone} />
                <DetailRow label="Alamat" value={student.address} />
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-muted/30 p-4">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>

                <div className="mt-1.5">
                  {meta ? (
                    <StatusBadge color={meta.color}>{meta.label}</StatusBadge>
                  ) : (
                    <StatusBadge>{student.status ?? "-"}</StatusBadge>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">Saldo</p>

                <p className="mt-1 font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(student.balance ?? 0)}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
