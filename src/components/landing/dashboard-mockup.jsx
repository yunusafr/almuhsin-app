import {
  Bell,
  Users,
  Wallet,
  CalendarCheck,
  TrendingUp,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";

function StatCard({ title, value, color, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>

        <MoreHorizontal size={18} className="text-slate-400" />
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>

      <h3 className="mt-1 text-3xl font-bold">{value}</h3>
    </div>
  );
}

export default function DashboardMockup() {
  return (
    <section className="relative mt-24">
      {/* Glow */}

      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-96 w-96 rounded-full bg-green-500/20 blur-[140px]" />
      </div>

      {/* Floating Card */}

      <div className="absolute -left-6 top-10 hidden rounded-2xl border bg-white p-4 shadow-xl lg:block">
        <p className="text-xs text-slate-500">Presensi Hari Ini</p>

        <h3 className="mt-2 text-3xl font-bold">98%</h3>
      </div>

      <div className="absolute -right-6 bottom-20 hidden rounded-2xl border bg-white p-4 shadow-xl lg:block">
        <p className="text-xs text-slate-500">Santri Aktif</p>

        <h3 className="mt-2 text-3xl font-bold">1.250</h3>
      </div>

      {/* Dashboard */}

      <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-white/30 bg-white shadow-[0_40px_120px_rgba(15,23,42,.15)] dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-5 dark:border-slate-800">
          <div>
            <p className="text-sm text-slate-500">Dashboard</p>

            <h2 className="text-2xl font-bold">Almuhsin App</h2>
          </div>

          <Bell className="text-slate-400" />
        </div>

        {/* Body */}

        <div className="grid gap-8 p-8 lg:grid-cols-4">
          <StatCard
            title="Santri"
            value="1.250"
            icon={Users}
            color="bg-green-600"
          />

          <StatCard
            title="Asatidz"
            value="45"
            icon={GraduationCap}
            color="bg-blue-600"
          />

          <StatCard
            title="Pembayaran"
            value="Rp54JT"
            icon={Wallet}
            color="bg-orange-500"
          />

          <StatCard
            title="Presensi"
            value="98%"
            icon={CalendarCheck}
            color="bg-emerald-500"
          />
        </div>

        {/* Content */}

        <div className="grid gap-8 px-8 pb-8 lg:grid-cols-3">
          {/* Chart */}

          <div className="col-span-2 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Grafik Presensi</h3>

              <TrendingUp size={18} className="text-green-600" />
            </div>

            <div className="mt-8 flex h-56 items-end gap-4">
              {[45, 80, 60, 100, 70, 120, 95].map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-xl bg-gradient-to-t from-green-600 to-green-400 transition-all hover:opacity-80"
                  style={{
                    height: `${v}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Activity */}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
            <h3 className="font-semibold">Aktivitas Terbaru</h3>

            <div className="mt-6 space-y-5">
              {[
                "Ahmad hadir Subuh",
                "SPP bulan Juli dibayar",
                "Izin keluar disetujui",
                "Santri baru ditambahkan",
                "Presensi Maghrib dibuat",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-green-600" />

                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
