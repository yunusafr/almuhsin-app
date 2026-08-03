import { useMemo } from "react";
import {
  Users,
  Wallet,
  UserCog,
  ClipboardCheck,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { format } from "date-fns";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import SectionCard from "@/components/common/section-card";
import ChartCard from "@/components/common/chart-card";

import { useStudents } from "@/features/santri/hooks/use-students";
import { useTeachers } from "@/features/asatidz/hooks/use-teachers";
import { useActiveAcademicYear } from "@/features/academic-year/hooks/use-academic-year";
import { useAttendances } from "@/features/presensi/hooks/use-attendances";
import { useInvoices } from "@/features/keuangan/hooks/use-invoices";

import { formatCurrency } from "@/lib/utils";

const STATUS_COLORS = {
  aktif: "#16a34a",
  lulus: "#3b82f6",
  keluar: "#ef4444",
  mutasi: "#f59e0b",
};

function normalizeList(response) {
  const list = response?.data ?? response ?? [];

  return Array.isArray(list) ? list : [];
}

export default function DashboardPage() {
  const studentsQuery = useStudents();
  const teachersQuery = useTeachers();
  const activeYearQuery = useActiveAcademicYear();
  const attendancesQuery = useAttendances();
  const invoicesQuery = useInvoices();

  const students = normalizeList(studentsQuery.data);
  const teachers = normalizeList(teachersQuery.data);
  const attendances = normalizeList(attendancesQuery.data);
  const invoices = normalizeList(invoicesQuery.data);

  const activeYear = activeYearQuery.data?.data ?? activeYearQuery.data;

  const studentStats = useMemo(() => {
    return students.reduce(
      (acc, item) => {
        acc.total++;

        if (item.status in acc) acc[item.status]++;

        return acc;
      },
      { total: 0, aktif: 0, lulus: 0, keluar: 0, mutasi: 0 },
    );
  }, [students]);

  const today = format(new Date(), "yyyy-MM-dd");

  const attendanceToday = useMemo(() => {
    return attendances
      .filter((item) => item.date === today)
      .reduce((acc, item) => {
        const entries = item.students ?? item.details ?? [];

        return acc + entries.length;
      }, 0);
  }, [attendances, today]);

  const financeSummary = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        acc.paid += Number(invoice.paid_amount ?? 0);
        acc.remaining += Number(invoice.remaining_amount ?? 0);

        return acc;
      },
      { paid: 0, remaining: 0 },
    );
  }, [invoices]);

  const chartData = useMemo(() => {
    return [
      { name: "Aktif", value: studentStats.aktif, color: STATUS_COLORS.aktif },
      { name: "Lulus", value: studentStats.lulus, color: STATUS_COLORS.lulus },
      { name: "Keluar", value: studentStats.keluar, color: STATUS_COLORS.keluar },
      { name: "Mutasi", value: studentStats.mutasi, color: STATUS_COLORS.mutasi },
    ];
  }, [studentStats]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Assalamu'alaikum"
        description="Selamat datang kembali di Almuhsin App. Berikut ringkasan aktivitas pondok hari ini."
      />

      {/* Hero */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-green-100">Dashboard Pondok Pesantren</p>

            <h2 className="mt-2 text-4xl font-black">Almuhsin App ERP</h2>

            <p className="mt-4 max-w-xl text-green-100">
              Kelola seluruh administrasi pondok pesantren, presensi, keuangan,
              hingga data santri dalam satu platform modern.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-sm text-green-100">Tahun Pelajaran</p>

              <h3 className="mt-2 text-xl font-bold">
                {activeYear?.name ?? "-"}
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-sm text-green-100">Status</p>

              <h3 className="mt-2 text-xl font-bold">
                {activeYear?.is_active ? "Aktif" : "Belum Aktif"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Jumlah Santri"
          value={
            studentsQuery.isLoading
              ? "..."
              : studentsQuery.isError
                ? "—"
                : studentStats.total
          }
          icon={Users}
        />

        <StatCard
          title="Jumlah Asatidz"
          value={
            teachersQuery.isLoading
              ? "..."
              : teachersQuery.isError
                ? "—"
                : teachers.length
          }
          icon={UserCog}
        />

        <StatCard
          title="Presensi Hari Ini"
          value={
            attendancesQuery.isLoading
              ? "..."
              : attendancesQuery.isError
                ? "—"
                : attendanceToday
          }
          icon={ClipboardCheck}
        />

        <StatCard
          title="Pembayaran Terkumpul"
          value={
            invoicesQuery.isLoading
              ? "..."
              : invoicesQuery.isError
                ? "—"
                : formatCurrency(financeSummary.paid)
          }
          icon={Wallet}
        />
      </div>

      {/* Content */}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <ChartCard title="Komposisi Santri per Status">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="var(--muted-foreground)"
                />

                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                  }}
                />

                <Bar dataKey="value" name="Santri" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <SectionCard
            title="Aktivitas Hari Ini"
            description="Ringkasan aktivitas pondok."
          >
            <div className="space-y-4">
              {[
                `${studentStats.total} santri terdaftar dalam sistem.`,
                attendanceToday > 0
                  ? `${attendanceToday} catatan presensi hari ini.`
                  : "Belum ada presensi yang dicatat hari ini.",
                `${teachers.length} asatidz aktif mengajar.`,
                invoices.length > 0
                  ? `${invoices.length} tagihan terdaftar, ${formatCurrency(financeSummary.remaining)} belum terbayar.`
                  : "Belum ada tagihan yang dibuat.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border p-4 transition hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{item}</p>

                    <p className="text-sm text-muted-foreground">Hari ini</p>
                  </div>

                  <ArrowUpRight size={18} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Quick Info" description="Informasi singkat.">
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Santri Aktif
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  {studentStats.aktif}
                </h3>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Santri Lulus / Keluar
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  {studentStats.lulus + studentStats.keluar}
                </h3>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Tagihan Belum Terbayar
                </p>

                <h3 className="mt-1 text-2xl font-bold text-orange-500">
                  {formatCurrency(financeSummary.remaining)}
                </h3>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-primary/5 p-4">
                <GraduationCap size={20} className="text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Tahun Pelajaran Aktif
                  </p>

                  <p className="font-semibold">
                    {activeYear?.name ?? "Belum diatur"}
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
