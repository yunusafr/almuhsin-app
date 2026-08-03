import { useMemo, useState } from "react";
import {
  CircleDollarSign,
  HandCoins,
  RefreshCw,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import StatusBadge from "@/components/common/status-badge";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";
import DataTable from "@/components/data-table/data-table";

import { useInvoices } from "@/features/keuangan/hooks/use-invoices";

import { getInvoiceStatus } from "../invoice/components/invoice-columns";
import PaymentDialog from "../invoice/components/payment-dialog";

import { formatCurrency, formatDate } from "@/lib/utils";

function normalizeData(response) {
  const list = response?.data ?? response ?? [];

  return Array.isArray(list) ? list : [];
}

export default function PembayaranPage() {
  const { data, isLoading, refetch } = useInvoices();

  const invoices = normalizeData(data);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [payInvoice, setPayInvoice] = useState(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const remaining = Number(invoice.remaining_amount ?? 0);

      const matchFilter =
        filter === "all" ||
        (filter === "outstanding" && remaining > 0) ||
        (filter === "paid" && remaining <= 0);

      const matchKeyword =
        !keyword ||
        invoice.invoice_number?.toLowerCase().includes(keyword) ||
        invoice.student?.name?.toLowerCase().includes(keyword) ||
        invoice.student_name?.toLowerCase().includes(keyword);

      return matchFilter && matchKeyword;
    });
  }, [invoices, search, filter]);

  const statistics = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        acc.total++;
        acc.paidAmount += Number(invoice.paid_amount ?? 0);
        acc.remainingAmount += Number(invoice.remaining_amount ?? 0);

        if (Number(invoice.remaining_amount ?? 0) <= 0) acc.lunas++;
        else acc.belum++;

        return acc;
      },
      {
        total: 0,
        paidAmount: 0,
        remainingAmount: 0,
        lunas: 0,
        belum: 0,
      },
    );
  }, [invoices]);

  const columns = [
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
      cell: ({ row }) =>
        row.original.student?.name ?? row.original.student_name ?? "-",
    },

    {
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => (
        <span className="whitespace-nowrap font-medium">
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
        <span className="whitespace-nowrap font-semibold text-red-600 dark:text-red-400">
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
      cell: ({ row }) => {
        const remaining = Number(row.original.remaining_amount ?? 0);

        return (
          <Button
            size="sm"
            variant={remaining > 0 ? "default" : "outline"}
            disabled={remaining <= 0}
            onClick={() => setPayInvoice(row.original)}
          >
            <HandCoins className="mr-2 h-4 w-4" />

            {remaining > 0 ? "Bayar" : "Lunas"}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pembayaran"
        back="/app"
        description="Catat pembayaran tagihan santri."
        actions={
          <Button variant="outline" onClick={refetch}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tagihan"
          value={statistics.total}
          icon={Wallet}
        />

        <StatCard
          title="Terkumpul"
          value={formatCurrency(statistics.paidAmount)}
          icon={CircleDollarSign}
        />

        <StatCard
          title="Belum Terbayar"
          value={formatCurrency(statistics.remainingAmount)}
          icon={Wallet}
        />

        <StatCard
          title="Lunas"
          value={statistics.lunas}
          icon={CircleDollarSign}
        />
      </div>

      <TableContainer>
        <DataTableHeader
          title="Daftar Pembayaran"
          description={`${filteredData.length} tagihan`}
          search={
            <DataTableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor atau nama santri..."
            />
          }
          actions={
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-10 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring"
            >
              <option value="all">Semua</option>
              <option value="outstanding">Belum Lunas</option>
              <option value="paid">Sudah Lunas</option>
            </select>
          }
        />

        <DataTable
          data={filteredData}
          columns={columns}
          loading={isLoading}
        />
      </TableContainer>

      <PaymentDialog
        open={!!payInvoice}
        onOpenChange={(open) => {
          if (!open) setPayInvoice(null);
        }}
        invoice={payInvoice}
      />
    </div>
  );
}
