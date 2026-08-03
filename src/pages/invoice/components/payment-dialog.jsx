import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { Wallet } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FormWrapper from "@/components/form/form-wrapper";
import FormSection from "@/components/form/form-section";
import FormGrid from "@/components/form/form-grid";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import FormDatePicker from "@/components/form/form-date-picker";
import FormTextarea from "@/components/form/form-textarea";
import FormActions from "@/components/form/form-actions";
import StatusBadge from "@/components/common/status-badge";

import { useCreatePayment } from "@/features/keuangan/hooks/use-payments";

import {
  paymentSchema,
  PAYMENT_METHODS,
} from "@/features/keuangan/schemas/invoice-schema";

import { formatCurrency } from "@/lib/utils";

export default function PaymentDialog({ open, onOpenChange, invoice }) {
  const createPaymentMutation = useCreatePayment();

  const remaining = useMemo(
    () => Number(invoice?.remaining_amount ?? 0),
    [invoice],
  );

  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      invoice_id: "",
      amount: "",
      payment_date: format(new Date(), "yyyy-MM-dd"),
      payment_method: "Tunai",
      reference_number: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (open && invoice) {
      form.reset({
        invoice_id: invoice.id,
        amount: remaining,
        payment_date: format(new Date(), "yyyy-MM-dd"),
        payment_method: "Tunai",
        reference_number: "",
        notes: "",
      });
    }
  }, [open, invoice, remaining, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        invoice_id: values.invoice_id,
        amount: Number(values.amount),
        payment_date: values.payment_date,
        payment_method: values.payment_method,
        ...(values.reference_number
          ? { reference_number: values.reference_number }
          : {}),
        ...(values.notes ? { notes: values.notes } : {}),
      };

      await createPaymentMutation.mutateAsync(payload);

      toast.success("Pembayaran berhasil dicatat");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Gagal mencatat pembayaran.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet size={18} className="text-primary" />

            Catat Pembayaran
          </DialogTitle>

          <DialogDescription>
            {invoice?.invoice_number ?? ""} —{" "}
            {invoice?.student?.name ?? invoice?.student_name ?? ""}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-muted/50 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Sisa Tagihan</p>

            <p className="text-lg font-bold">{formatCurrency(remaining)}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Total Tagihan</p>

            <p className="text-lg font-semibold">
              {formatCurrency(invoice?.total_amount)}
            </p>
          </div>

          <StatusBadge color="green">
            Terbayar {formatCurrency(invoice?.paid_amount)}
          </StatusBadge>
        </div>

        <FormWrapper form={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <FormSection
            title="Detail Pembayaran"
            description="Lengkapi informasi pembayaran santri."
          >
            <FormGrid cols={2}>
              <FormInput
                control={form.control}
                name="amount"
                label="Nominal Bayar (Rp)"
                type="number"
                placeholder="250000"
              />

              <FormSelect
                control={form.control}
                name="payment_method"
                label="Metode Pembayaran"
                options={PAYMENT_METHODS}
              />

              <FormDatePicker
                control={form.control}
                name="payment_date"
                label="Tanggal Bayar"
              />

              <FormInput
                control={form.control}
                name="reference_number"
                label="No. Referensi (Opsional)"
                placeholder="REF-2026-0001"
              />
            </FormGrid>

            <div className="mt-5">
              <FormTextarea
                control={form.control}
                name="notes"
                label="Catatan (Opsional)"
                placeholder="Contoh: DP pertama..."
                rows={3}
              />
            </div>
          </FormSection>

          <FormActions
            loading={createPaymentMutation.isPending}
            submitLabel="Simpan Pembayaran"
            cancelLabel="Batal"
            onCancel={() => onOpenChange(false)}
          />
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
