import { Eye, MoreHorizontal, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/status-badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatCurrency, formatDate } from "@/lib/utils";

export function getInvoiceStatus(invoice) {
  const remaining = Number(invoice.remaining_amount ?? 0);

  if (remaining <= 0) return { label: "Lunas", color: "green" };

  const paid = Number(invoice.paid_amount ?? 0);

  if (paid > 0) {
    const overdue =
      invoice.due_date && new Date(invoice.due_date) < new Date();

    if (overdue) return { label: "Tunggakan", color: "red" };

    return { label: "Angsuran", color: "blue" };
  }

  const overdue =
    invoice.due_date && new Date(invoice.due_date) < new Date();

  if (overdue) return { label: "Jatuh Tempo", color: "red" };

  return { label: "Belum Bayar", color: "yellow" };
}

export const invoiceColumns = ({ onDetail, onPay }) => [
  {
    accessorKey: "invoice_number",
    header: "No. Tagihan",
    cell: ({ row }) => (
      <span className="font-semibold whitespace-nowrap">
        {row.original.invoice_number ?? "-"}
      </span>
    ),
  },

  {
    accessorKey: "student",
    header: "Santri",
    cell: ({ row }) => {
      const student = row.original.student;

      return student?.name ?? row.original.student_name ?? "-";
    },
  },

  {
    accessorKey: "total_amount",
    header: "Total Tagihan",
    cell: ({ row }) => (
      <span className="font-semibold whitespace-nowrap">
        {formatCurrency(row.original.total_amount)}
      </span>
    ),
  },

  {
    accessorKey: "paid_amount",
    header: "Terbayar",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-green-600 dark:text-green-400">
        {formatCurrency(row.original.paid_amount)}
      </span>
    ),
  },

  {
    accessorKey: "remaining_amount",
    header: "Sisa",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-red-600 dark:text-red-400">
        {formatCurrency(row.original.remaining_amount)}
      </span>
    ),
  },

  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const { label, color } = getInvoiceStatus(row.original);

      return <StatusBadge color={color}>{label}</StatusBadge>;
    },
  },

  {
    accessorKey: "due_date",
    header: "Jatuh Tempo",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDate(row.original.due_date)}
      </span>
    ),
  },

  {
    id: "aksi",
    header: "",
    enableSorting: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onDetail?.(row.original)}>
            <Eye className="mr-2 h-4 w-4" />
            Detail
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => onPay(row.original)}>
            <Wallet className="mr-2 h-4 w-4" />
            Catat Pembayaran
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
