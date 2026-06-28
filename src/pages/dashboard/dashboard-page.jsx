import {
  Users,
  Wallet,
  UserCog,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import SectionCard from "@/components/common/section-card";

export default function DashboardPage() {
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

              <h3 className="mt-2 text-xl font-bold">2026 / 2027</h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-sm text-green-100">Status</p>

              <h3 className="mt-2 text-xl font-bold">Aktif</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Jumlah Santri"
          value="1.250"
          trend="+12%"
          icon={Users}
        />

        <StatCard
          title="Jumlah Asatidz"
          value="45"
          trend="+5%"
          icon={UserCog}
        />

        <StatCard
          title="Presensi Hari Ini"
          value="1.120"
          trend="+8%"
          icon={ClipboardCheck}
        />

        <StatCard
          title="Pembayaran Bulan Ini"
          value="Rp54 Jt"
          trend="+15%"
          icon={Wallet}
        />
      </div>

      {/* Content */}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SectionCard
            title="Aktivitas Hari Ini"
            description="Ringkasan aktivitas pondok."
          >
            <div className="space-y-4">
              {[
                "27 Santri melakukan pembayaran SPP.",
                "Presensi Sholat Subuh selesai.",
                "3 Santri mengajukan izin.",
                "12 Santri baru terdaftar.",
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

        <SectionCard title="Quick Info" description="Informasi singkat.">
          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Santri Putra
              </p>

              <h3 className="mt-1 text-2xl font-bold">725</h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Santri Putri
              </p>

              <h3 className="mt-1 text-2xl font-bold">525</h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Tagihan Aktif</p>

              <h3 className="mt-1 text-2xl font-bold text-orange-500">
                Rp18.500.000
              </h3>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
