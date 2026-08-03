import { useMemo, useState } from "react";
import {
  FilePlus2,
  Plus,
  RefreshCw,
  ReceiptText,
  Wallet,
  CircleDollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";
import DataTable from "@/components/data-table/data-table";

import { useInvoices } from "@/features/keuangan/hooks/use-invoices";

import { invoiceColumns, getInvoiceStatus } from "./components/invoice-columns";
import InvoiceCreateDialog from "./components/invoice-create-dialog";
import InvoiceDetailDialog from "./components/invoice-detail-dialog";
import PaymentDialog from "./components/payment-dialog";

import { formatCurrency } from "@/lib/utils";

function normalizeData(response) {
  const list = response?.data ?? response ?? [];

  return Array.isArray(list) ? list : [];
}

export default function InvoicePage() {
  const { data, isLoading, refetch } = useInvoices();

  const invoices = normalizeData(data);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [createOpen, setCreateOpen] = useState(false);
  const [detailInvoice, setDetailInvoice] = useState(null);
  const [payInvoice, setPayInvoice] = useState(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const { label } = getInvoiceStatus(invoice);

      const matchStatus =
        statusFilter === "all" ||
        label.toLowerCase() === statusFilter.toLowerCase();

      const matchKeyword =
        !keyword ||
        invoice.invoice_number?.toLowerCase().includes(keyword) ||
        invoice.student?.name?.toLowerCase().includes(keyword) ||
        invoice.student_name?.toLowerCase().includes(keyword);

      return matchStatus && matchKeyword;
    });
  }, [invoices, search, statusFilter]);

  const statistics = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        acc.total++;
        acc.totalAmount += Number(invoice.total_amount ?? 0);
        acc.paidAmount += Number(invoice.paid_amount ?? 0);
        acc.remainingAmount += Number(invoice.remaining_amount ?? 0);

        const { label } = getInvoiceStatus(invoice);

        if (label === "Lunas") acc.lunas++;
        else if (label === "Belum Bayar") acc.belum++;
        else acc.angsuran++;

        return acc;
      },
      {
        total: 0,
        totalAmount: 0,
        paidAmount: 0,
        remainingAmount: 0,
        lunas: 0,
        belum: 0,
        angsuran: 0,
      },
    );
  }, [invoices]);

  const columns = useMemo(
    () =>
      invoiceColumns({
        onDetail: (row) => setDetailInvoice(row),
        onPay: (row) => setPayInvoice(row),
      }),
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tagihan (Invoice)"
        description="Kelola tagihan SPP dan pembayaran santri."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Buat Tagihan
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tagihan"
          value={statistics.total}
          icon={ReceiptText}
        />

        <StatCard
          title="Nilai Tagihan"
          value={formatCurrency(statistics.totalAmount)}
          icon={FilePlus2}
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
      </div>

      <TableContainer>
        <DataTableHeader
          title="Daftar Tagihan"
          description={`${filteredData.length} tagihan • ${statistics.lunas} lunas • ${statistics.belum} belum bayar`}
          search={
            <DataTableSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor atau nama santri..."
            />
          }
          actions={
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring"
            >
              <option value="all">Semua Status</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum Bayar">Belum Bayar</option>
              <option value="Angsuran">Angsuran</option>
              <option value="Jatuh Tempo">Jatuh Tempo</option>
              <option value="Tunggakan">Tunggakan</option>
            </select>
          }
        />

        <DataTable
          data={filteredData}
          columns={columns}
          loading={isLoading}
        />
      </TableContainer>

      <InvoiceCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      <InvoiceDetailDialog
        open={!!detailInvoice}
        onOpenChange={(open) => {
          if (!open) setDetailInvoice(null);
        }}
        invoice={detailInvoice}
      />

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
