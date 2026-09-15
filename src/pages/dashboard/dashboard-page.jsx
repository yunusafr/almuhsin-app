import { useMemo } from "react";
import {
  Users,
  Wallet,
  UserCog,
  ClipboardCheck,
  ArrowUpRight,
  GraduationCap,
  Shield,
  FileText,
  UserCheck,
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

import useAuthStore from "@/features/auth/stores/auth-store";
import { useStudents } from "@/features/santri/hooks/use-students";
import { useTeachers } from "@/features/asatidz/hooks/use-teachers";
import { useActiveAcademicYear } from "@/features/academic-year/hooks/use-academic-year";
import { useAttendances } from "@/features/presensi/hooks/use-attendances";
import { useInvoices } from "@/features/keuangan/hooks/use-invoices";
import { useStudentLeaves } from "@/features/perizinan/hooks/use-student-leaves";
import { usePhoneCollections } from "@/features/hp/hooks/use-phone-collections";
import { useTeacherAttendances } from "@/features/presensi-guru/hooks/use-teacher-attendances";

import { formatCurrency, listData } from "@/lib/utils";

const STATUS_COLORS = {
  aktif: "#16a34a",
  lulus: "#3b82f6",
  keluar: "#ef4444",
  mutasi: "#f59e0b",
};

const ROLE_GREETING = {
  "Super Admin": {
    title: "Assalamu'alaikum",
    desc: "Ringkasan lengkap administrasi pondok pesantren.",
  },
  Ustadz: {
    title: "Assalamu'alaikum",
    desc: "Ringkasan presensi santri hari ini.",
  },
  Bendahara: {
    title: "Assalamu'alaikum",
    desc: "Ringkasan keuangan dan tagihan pondok.",
  },
  Keamanan: {
    title: "Assalamu'alaikum",
    desc: "Ringkasan izin, pengumpulan HP, dan presensi guru.",
  },
};

function Hero({ role, activeYear }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 p-8 text-white shadow-2xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-green-100">Dashboard Pondok Pesantren</p>
          <h2 className="mt-2 text-4xl font-black">Almuhsin App ERP</h2>
          <p className="mt-4 max-w-xl text-green-100">
            {ROLE_GREETING[role]?.desc ?? ROLE_GREETING["Super Admin"].desc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-sm text-green-100">Tahun Pelajaran</p>
            <h3 className="mt-2 text-xl font-bold">{activeYear?.name ?? "-"}</h3>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-sm text-green-100">Peran</p>
            <h3 className="mt-2 text-xl font-bold">{role}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const studentsQuery = useStudents({ per_page: 1000 });
  const teachersQuery = useTeachers();
  const activeYearQuery = useActiveAcademicYear();
  const attendancesQuery = useAttendances({ per_page: 1000 });
  const invoicesQuery = useInvoices();

  const students = listData(studentsQuery.data);
  const teachers = listData(teachersQuery.data);
  const attendances = listData(attendancesQuery.data);
  const invoices = listData(invoicesQuery.data);
  const activeYear = activeYearQuery.data?.data ?? activeYearQuery.data;

  const studentStats = useMemo(
    () =>
      students.reduce(
        (acc, item) => {
          acc.total++;
          if (item.status in acc) acc[item.status]++;
          return acc;
        },
        { total: 0, aktif: 0, lulus: 0, keluar: 0, mutasi: 0 },
      ),
    [students],
  );

  const today = format(new Date(), "yyyy-MM-dd");
  const attendanceToday = useMemo(
    () =>
      attendances
        .filter((item) => item.date === today)
        .reduce(
          (acc, item) =>
            acc + (item.records ?? item.students ?? item.details ?? []).length,
          0,
        ),
    [attendances, today],
  );

  const finance = useMemo(
    () =>
      invoices.reduce(
        (acc, inv) => {
          acc.paid += Number(inv.paid_amount ?? 0);
          acc.remaining += Number(inv.remaining_amount ?? 0);
          return acc;
        },
        { paid: 0, remaining: 0 },
      ),
    [invoices],
  );

  const chartData = useMemo(
    () => [
      { name: "Aktif", value: studentStats.aktif, color: STATUS_COLORS.aktif },
      { name: "Lulus", value: studentStats.lulus, color: STATUS_COLORS.lulus },
      { name: "Keluar", value: studentStats.keluar, color: STATUS_COLORS.keluar },
      { name: "Mutasi", value: studentStats.mutasi, color: STATUS_COLORS.mutasi },
    ],
    [studentStats],
  );

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Jumlah Santri" value={studentStats.total} icon={Users} />
        <StatCard title="Jumlah Ustadz" value={teachers.length} icon={UserCog} />
        <StatCard title="Presensi Hari Ini" value={attendanceToday} icon={ClipboardCheck} />
        <StatCard title="Pembayaran Terkumpul" value={formatCurrency(finance.paid)} icon={Wallet} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <ChartCard title="Komposisi Santri per Status">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={{ borderRadius: 16, border: "1px solid var(--border)" }} />
                <Bar dataKey="value" name="Santri" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <SectionCard title="Aktivitas Hari Ini" description="Ringkasan aktivitas pondok.">
            <div className="space-y-4">
              {[
                `${studentStats.total} santri terdaftar dalam sistem.`,
                attendanceToday > 0
                  ? `${attendanceToday} catatan presensi hari ini.`
                  : "Belum ada presensi yang dicatat hari ini.",
                `${teachers.length} ustadz aktif mengajar.`,
                invoices.length > 0
                  ? `${invoices.length} tagihan terdaftar, ${formatCurrency(finance.remaining)} belum terbayar.`
                  : "Belum ada tagihan yang dibuat.",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border p-4 transition hover:bg-muted/50">
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
                <p className="text-sm text-muted-foreground">Total Santri Aktif</p>
                <h3 className="mt-1 text-2xl font-bold">{studentStats.aktif}</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Santri Lulus / Keluar</p>
                <h3 className="mt-1 text-2xl font-bold">{studentStats.lulus + studentStats.keluar}</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tagihan Belum Terbayar</p>
                <h3 className="mt-1 text-2xl font-bold text-orange-500">{formatCurrency(finance.remaining)}</h3>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-primary/5 p-4">
                <GraduationCap size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Tahun Pelajaran Aktif</p>
                  <p className="font-semibold">{activeYear?.name ?? "Belum diatur"}</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}

function UstadzDashboard() {
  const attendancesQuery = useAttendances({ per_page: 1000 });
  const attendances = listData(attendancesQuery.data);
  const today = format(new Date(), "yyyy-MM-dd");

  const attendanceToday = useMemo(
    () =>
      attendances
        .filter((item) => item.date === today)
        .reduce((acc, item) => acc + (item.records ?? item.students ?? item.details ?? []).length, 0),
    [attendances, today],
  );

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatCard title="Presensi Hari Ini" value={attendanceToday} icon={ClipboardCheck} />
      <StatCard title="Sesi Presensi" value={attendances.length} icon={FileText} />
      <StatCard title="Total Catatan" value={attendances.reduce((a, i) => a + (i.records ?? i.students ?? i.details ?? []).length, 0)} icon={UserCheck} />
    </div>
  );
}

function BendaharaDashboard() {
  const invoicesQuery = useInvoices();
  const invoices = listData(invoicesQuery.data);

  const finance = useMemo(
    () =>
      invoices.reduce(
        (acc, inv) => {
          acc.paid += Number(inv.paid_amount ?? 0);
          acc.remaining += Number(inv.remaining_amount ?? 0);
          acc.total += Number(inv.total_amount ?? 0);
          return acc;
        },
        { paid: 0, remaining: 0, total: 0 },
      ),
    [invoices],
  );

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatCard title="Total Tagihan" value={formatCurrency(finance.total)} icon={FileText} />
      <StatCard title="Terkumpul" value={formatCurrency(finance.paid)} icon={Wallet} />
      <StatCard title="Belum Terbayar" value={formatCurrency(finance.remaining)} icon={Wallet} />
    </div>
  );
}

function KeamananDashboard() {
  const leavesQuery = useStudentLeaves({ per_page: 1 });
  const phonesQuery = usePhoneCollections({ per_page: 1 });
  const teacherAttendancesQuery = useTeacherAttendances({ per_page: 1 });

  const leaveTotal = leavesQuery.data?.data?.pagination?.total ?? 0;
  const phoneTotal = phonesQuery.data?.data?.pagination?.total ?? 0;
  const teacherAttendanceTotal = teacherAttendancesQuery.data?.data?.pagination?.total ?? 0;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatCard title="Izin Santri" value={leaveTotal} icon={FileText} />
      <StatCard title="HP Terkumpul" value={phoneTotal} icon={Shield} />
      <StatCard title="Presensi Guru" value={teacherAttendanceTotal} icon={UserCheck} />
    </div>
  );
}

export default function DashboardPage() {
  const roles = useAuthStore((s) => s.roles);
  const role = roles?.[0] ?? "Super Admin";

  const activeYearQuery = useActiveAcademicYear();
  const activeYear = activeYearQuery.data?.data ?? activeYearQuery.data;

  return (
    <div className="space-y-8">
      <PageHeader
        title={ROLE_GREETING[role]?.title ?? "Assalamu'alaikum"}
        description={ROLE_GREETING[role]?.desc ?? "Selamat datang kembali di Almuhsin App."}
      />

      <Hero role={role} activeYear={activeYear} />

      {role === "Super Admin" && <AdminDashboard />}
      {role === "Ustadz" && <UstadzDashboard />}
      {role === "Bendahara" && <BendaharaDashboard />}
      {role === "Keamanan" && <KeamananDashboard />}
    </div>
  );
}
