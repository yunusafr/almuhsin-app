import { z } from "zod";

export const INVOICE_ITEM_TYPES = [
  { label: "SPP Normal", value: "SPP_NORMAL" },
  { label: "SPP PKL", value: "SPP_PKL" },
  { label: "SPP Beasiswa", value: "SPP_BEASISWA" },
  { label: "Daftar Ulang Baru", value: "DAFTAR_ULANG_BARU" },
  { label: "Daftar Ulang Lama", value: "DAFTAR_ULANG_LAMA" },
  { label: "Insidental", value: "INSIDENTAL" },
  { label: "Lainnya", value: "LAINNYA" },
];

export const PAYMENT_METHODS = [
  { label: "Tunai", value: "Tunai" },
  { label: "Transfer Bank", value: "Transfer Bank" },
  { label: "Transfer E-Wallet", value: "E-Wallet" },
  { label: "Virtual Account", value: "Virtual Account" },
];

const invoiceItemSchema = z.object({
  type: z.string().min(1, "Jenis item wajib diisi"),
  description: z.string().optional(),
  amount: z.coerce
    .number({ message: "Nominal wajib diisi" })
    .min(1, "Nominal minimal 1"),
});

export const createInvoiceSchema = z.object({
  student_ids: z
    .array(z.string())
    .min(1, "Minimal satu santri harus dipilih"),
  due_date: z.string().min(1, "Tanggal jatuh tempo wajib diisi"),
  items: z
    .array(invoiceItemSchema)
    .min(1, "Minimal satu item tagihan"),
});

export const paymentSchema = z.object({
  invoice_id: z.string().min(1),
  amount: z.coerce
    .number({ message: "Nominal wajib diisi" })
    .min(1, "Nominal minimal 1"),
  payment_date: z.string().min(1, "Tanggal pembayaran wajib diisi"),
  payment_method: z.string().min(1, "Metode pembayaran wajib diisi"),
  reference_number: z.string().optional(),
  notes: z.string().optional(),
});
