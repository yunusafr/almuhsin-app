import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CircleDollarSign,
  FilePlus2,
  RefreshCw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import ChartCard from "@/components/common/chart-card";
import StatusBadge from "@/components/common/status-badge";
import EmptyState from "@/components/common/empty-state";

import { useInvoices } from "@/features/keuangan/hooks/use-invoices";

import { getInvoiceStatus } from "../invoice/components/invoice-columns";

import { formatCurrency } from "@/lib/utils";

function normalizeData(response) {
  const list = response?.data ?? response ?? [];

  return Array.isArray(list) ? list : [];
}

const STATUS_COLORS = {
  Lunas: "#16a34a",
  "Belum Bayar": "#f59e0b",
  Angsuran: "#3b82f6",
  "Jatuh Tempo": "#ef4444",
  Tunggakan: "#dc2626",
};

export default function LaporanPage() {
  const { data, isLoading, refetch } = useInvoices();

  const invoices = normalizeData(data);

  const statistics = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        acc.total++;
        acc.totalAmount += Number(invoice.total_amount ?? 0);
        acc.paidAmount += Number(invoice.paid_amount ?? 0);
        acc.remainingAmount += Number(invoice.remaining_amount ?? 0);

        return acc;
      },
      { total: 0, totalAmount: 0, paidAmount: 0, remainingAmount: 0 },
    );
  }, [invoices]);

  const monthlyData = useMemo(() => {
    const map = new Map();

    invoices.forEach((invoice) => {
      if (!invoice.created_at) return;

      let month;

      try {
        month = format(parseISO(invoice.created_at), "MMM yyyy", {
          locale: id,
        });
      } catch {
        return;
      }

      const entry = map.get(month) ?? { bulan: month, total: 0, terbayar: 0 };

      entry.total += Number(invoice.total_amount ?? 0);
      entry.terbayar += Number(invoice.paid_amount ?? 0);

      map.set(month, entry);
    });

    return Array.from(map.values()).sort((a, b) =>
      a.bulan.localeCompare(b.bulan),
    );
  }, [invoices]);

  const statusData = useMemo(() => {
    const map = new Map();

    invoices.forEach((invoice) => {
      const { label } = getInvoiceStatus(invoice);

      const entry = map.get(label) ?? { name: label, value: 0, amount: 0 };

      entry.value++;
      entry.amount += Number(invoice.total_amount ?? 0);

      map.set(label, entry);
    });

    return Array.from(map.values());
  }, [invoices]);

  const topOutstanding = useMemo(() => {
    return invoices
      .filter((invoice) => Number(invoice.remaining_amount ?? 0) > 0)
      .sort(
        (a, b) =>
          Number(b.remaining_amount ?? 0) - Number(a.remaining_amount ?? 0),
      )
      .slice(0, 5);
  }, [invoices]);

  const collectionRate = statistics.totalAmount
    ? Math.round((statistics.paidAmount / statistics.totalAmount) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan Keuangan"
        description="Ringkasan dan statistik keuangan pondok."
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
          icon={FilePlus2}
        />

        <StatCard
          title="Total Nilai"
          value={formatCurrency(statistics.totalAmount)}
          icon={Wallet}
        />

        <StatCard
          title="Terkumpul"
          value={formatCurrency(statistics.paidAmount)}
          icon={CircleDollarSign}
        />

        <StatCard
          title="Tingkat Kolektibilitas"
          value={`${collectionRate}%`}
          icon={TrendingUp}
        />
      </div>

      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="animate-pulse text-muted-foreground">
            Memuat data...
          </div>
        </div>
      ) : invoices.length === 0 ? (
        <EmptyState
          title="Belum ada data"
          description="Belum ada tagihan yang tercatat. Buat tagihan terlebih dahulu."
        />
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <ChartCard title="Nilai Tagihan per Bulan">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <XAxis
                  dataKey="bulan"
                  tick={{ fontSize: 12 }}
                  stroke="var(--muted-foreground)"
                />

                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="var(--muted-foreground)"
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("id-ID", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                />

                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                  }}
                />

                <Bar dataKey="total" name="Tagihan" fill="#15803d" radius={[8, 8, 0, 0]} />
                <Bar dataKey="terbayar" name="Terkumpul" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Distribusi Status Tagihan">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] ?? "#94a3b8"}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [`${value} tagihan`, name]}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {statusData.map((entry) => (
                <span key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        STATUS_COLORS[entry.name] ?? "#94a3b8",
                    }}
                  />

                  {entry.name} ({entry.value})
                </span>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1 rounded-3xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Tagihan Terbesar Belum Lunas</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Prioritas penagihan berdasarkan sisa tagihan.
          </p>

          <div className="mt-5 space-y-3">
            {topOutstanding.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Semua tagihan sudah lunas. 🎉
              </p>
            ) : (
              topOutstanding.map((invoice) => {
                const { label, color } = getInvoiceStatus(invoice);

                return (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {invoice.student?.name ?? invoice.student_name ?? "-"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {invoice.invoice_number}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold whitespace-nowrap">
                        {formatCurrency(invoice.remaining_amount)}
                      </p>

                      <StatusBadge color={color}>{label}</StatusBadge>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="xl:col-span-2 rounded-3xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Ringkasan Keuangan</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Informasi ringkas arus kas pondok.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Total Nilai Tagihan",
                value: formatCurrency(statistics.totalAmount),
                color: "text-foreground",
              },
              {
                label: "Total Terkumpul",
                value: formatCurrency(statistics.paidAmount),
                color: "text-green-600 dark:text-green-400",
              },
              {
                label: "Total Belum Terbayar",
                value: formatCurrency(statistics.remainingAmount),
                color: "text-red-600 dark:text-red-400",
              },
              {
                label: "Rata-rata per Tagihan",
                value: formatCurrency(
                  statistics.total
                    ? statistics.totalAmount / statistics.total
                    : 0,
                ),
                color: "text-foreground",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-muted/40 p-5"
              >
                <p className="text-sm text-muted-foreground">{item.label}</p>

                <p className={`mt-2 text-2xl font-bold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {statusData.map((entry) => (
              <span
                key={entry.name}
                className="rounded-full border bg-muted/30 px-3 py-1.5 text-xs"
              >
                {entry.name}:{" "}
                <span className="font-semibold">
                  {formatCurrency(entry.amount)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
