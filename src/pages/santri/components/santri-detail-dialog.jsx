import { useQuery } from "@tanstack/react-query";
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

import { getStudentSummary } from "@/features/santri/api/students.api";

import { formatCurrency } from "@/lib/utils";

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

function formatDate(value) {
  if (!value) return "-";

  try {
    return format(new Date(value), "dd MMM yyyy", { locale: id });
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

function AttendanceSummary({ attendance }) {
  const items = [
    { label: "Hadir", value: attendance?.hadir ?? 0, color: "text-green-600" },
    { label: "Izin", value: attendance?.izin ?? 0, color: "text-blue-600" },
    { label: "Sakit", value: attendance?.sakit ?? 0, color: "text-amber-600" },
    { label: "Alfa", value: attendance?.alfa ?? 0, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border bg-muted/20 p-3 text-center"
        >
          <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
          <p className="text-xs text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function SantriDetailDialog({ open, onOpenChange, student }) {
  const meta = student ? STATUS_META[student.status] : null;

  const { data: summary } = useQuery({
    queryKey: ["student-summary", student?.id],
    queryFn: () => getStudentSummary(student.id),
    enabled: !!student?.id && open,
  });

  const invoices = summary?.invoices ?? [];
  const leaves = summary?.leaves ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRound size={18} className="text-primary" />
            {student?.name ?? "Detail Santri"}
          </DialogTitle>

          <DialogDescription>
            Informasi lengkap dan riwayat data santri.
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

            {/* Status & saldo */}
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
                <p className="mt-1 font-bold">{formatCurrency(student.balance ?? 0)}</p>
              </div>
            </div>

            {/* Ringkasan presensi */}
            <div>
              <h3 className="mb-3 font-semibold">Ringkasan Presensi</h3>
              <AttendanceSummary attendance={summary?.attendance} />
            </div>

            {/* Tagihan */}
            <div>
              <h3 className="mb-3 font-semibold">Tagihan ({invoices.length})</h3>

              {invoices.length === 0 ? (
                <p className="py-3 text-sm text-muted-foreground">Belum ada tagihan.</p>
              ) : (
                <div className="space-y-2">
                  {invoices.slice(0, 5).map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between rounded-2xl border p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{inv.invoice_number}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(inv.due_date)}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatCurrency(inv.remaining_amount ?? inv.total_amount)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Izin terakhir */}
            <div>
              <h3 className="mb-3 font-semibold">Izin Terakhir ({leaves.length})</h3>

              {leaves.length === 0 ? (
                <p className="py-3 text-sm text-muted-foreground">Belum ada izin.</p>
              ) : (
                <div className="space-y-2">
                  {leaves.slice(0, 5).map((leave) => (
                    <div key={leave.id} className="rounded-2xl border p-3">
                      <p className="text-sm font-medium">{leave.alasan_keluar}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(leave.tgl_keluar)} • Penjemput: {leave.penjemput ?? "-"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
