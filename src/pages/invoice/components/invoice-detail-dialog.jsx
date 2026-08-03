import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ReceiptText } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StatusBadge from "@/components/common/status-badge";
import EmptyState from "@/components/common/empty-state";

import { usePaymentsByInvoice } from "@/features/keuangan/hooks/use-payments";
import { INVOICE_ITEM_TYPES } from "@/features/keuangan/schemas/invoice-schema";

import { getInvoiceStatus } from "./invoice-columns";

import { formatCurrency, formatDate } from "@/lib/utils";

function parseDate(value) {
  if (!value) return "-";

  try {
    return format(new Date(value), "dd MMM yyyy", { locale: id });
  } catch {
    return value;
  }
}

export default function InvoiceDetailDialog({ open, onOpenChange, invoice }) {
  const { data: paymentResponse, isLoading } = usePaymentsByInvoice(
    invoice?.id,
  );

  const payments = paymentResponse?.data ?? paymentResponse ?? [];

  const items = invoice?.items ?? [];
  const status = invoice ? getInvoiceStatus(invoice) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ReceiptText size={18} className="text-primary" />

            {invoice?.invoice_number ?? "Detail Tagihan"}
          </DialogTitle>

          <DialogDescription>
            Rincian tagihan dan riwayat pembayaran.
          </DialogDescription>
        </DialogHeader>

        {invoice && (
          <div className="space-y-6">
            {/* Info ringkas */}
            <div className="grid gap-4 rounded-2xl border bg-muted/30 p-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Santri</p>

                <p className="mt-1 font-semibold">
                  {invoice.student?.name ?? invoice.student_name ?? "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Status</p>

                <div className="mt-1">
                  {status && (
                    <StatusBadge color={status.color}>
                      {status.label}
                    </StatusBadge>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Jatuh Tempo</p>

                <p className="mt-1 font-semibold">
                  {formatDate(invoice.due_date)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Total</p>

                <p className="mt-1 font-bold text-primary">
                  {formatCurrency(invoice.total_amount)}
                </p>
              </div>
            </div>

            {/* Progress pembayaran */}
            <div className="rounded-2xl border p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Terbayar {formatCurrency(invoice.paid_amount)}
                </span>

                <span className="font-semibold text-red-600 dark:text-red-400">
                  Sisa {formatCurrency(invoice.remaining_amount)}
                </span>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-500 transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (Number(invoice.paid_amount) /
                        Math.max(Number(invoice.total_amount), 1)) *
                        100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Item tagihan */}
            <div>
              <h3 className="mb-3 font-semibold">Item Tagihan</h3>

              {items.length === 0 ? (
                <EmptyState
                  title="Tidak ada item"
                  description="Tagihan ini tidak memiliki rincian item."
                />
              ) : (
                <div className="space-y-2">
                  {items.map((item, index) => {
                    const meta = INVOICE_ITEM_TYPES.find(
                      (t) => t.value === item.type,
                    );

                    return (
                      <div
                        key={`${item.type}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-3"
                      >
                        <div>
                          <p className="font-medium">
                            {meta?.label ?? item.type ?? "Item"}
                          </p>

                          {item.description && (
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <span className="font-semibold whitespace-nowrap">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Riwayat pembayaran */}
            <div>
              <h3 className="mb-3 font-semibold">Riwayat Pembayaran</h3>

              {isLoading ? (
                <div className="animate-pulse py-6 text-center text-sm text-muted-foreground">
                  Memuat riwayat pembayaran...
                </div>
              ) : payments.length === 0 ? (
                <EmptyState
                  title="Belum ada pembayaran"
                  description="Belum ada pembayaran yang tercatat untuk tagihan ini."
                />
              ) : (
                <div className="space-y-2">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex flex-col gap-2 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium">
                          {payment.payment_number ?? "-"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {payment.payment_method ?? "-"} •{" "}
                          {parseDate(payment.payment_date)} •{" "}
                          {payment.cashier_name ?? "-"}
                        </p>

                        {payment.reference_number && (
                          <p className="text-xs text-muted-foreground">
                            Ref: {payment.reference_number}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(payment.amount)}
                        </p>

                        {payment.notes && (
                          <p className="text-xs text-muted-foreground">
                            {payment.notes}
                          </p>
                        )}
                      </div>
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
