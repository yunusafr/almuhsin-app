import { ArrowRight, Sparkles, Smartphone, Users, UserCog, ClipboardCheck, HandCoins } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedStat from "@/components/landing/animated-stat";

import { useLandingStats } from "@/features/landing/hooks/use-landing-stats";

function formatCompact(value) {
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function Hero() {
  const stats = useLandingStats();
  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      {/* Background */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[150px]" />

        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-emerald-300/20 blur-[120px]" />

        <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-yellow-300/20 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle,#15803D 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-medium text-green-700">
            <Sparkles className="mr-2 inline h-4 w-4" />
            ERP Modern Untuk Pondok Pesantren
          </div>
        </div>
        {/* Title */}
        <div className="mx-auto mt-8 max-w-5xl text-center">
          <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-900 lg:text-7xl dark:text-white">
            Digitalisasi
            <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Administrasi Pondok
            </span>
            Menjadi Lebih Mudah
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-600 dark:text-slate-400">
            Kelola santri, presensi, keuangan, perizinan, pembayaran SPP,
            administrasi asatidz, hingga laporan pondok dalam satu platform
            modern yang cepat, aman, dan mudah digunakan.
          </p>
        </div>
        {/* Button */}
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Button
            size="lg"
            className="h-14 rounded-2xl bg-green-600 px-8 text-base font-semibold text-white hover:bg-green-700"
            nativeButton={false}
            render={<NavLink to="/login" />}
          >
            Mulai Sekarang

            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        {/* Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <Stat icon={Users} label="Santri">
            <AnimatedStat value={stats.students} suffix="+" />
          </Stat>

          <Stat icon={UserCog} label="Asatidz">
            <AnimatedStat value={stats.teachers} />
          </Stat>

          <Stat icon={ClipboardCheck} label="Tingkat Kehadiran">
            <AnimatedStat value={stats.attendanceRate} suffix="%" />
          </Stat>

          {stats.isLive ? (
            <Stat icon={HandCoins} label="Pembayaran Terkumpul">
              <AnimatedStat value={formatCompact(stats.collected ?? 0)} prefix="Rp " />
            </Stat>
          ) : (
            <Stat icon={Smartphone} label="Responsive">
              <AnimatedStat value={100} suffix="%" />
            </Stat>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={18} className="text-green-600" />

      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        <span className="text-lg font-bold text-slate-900 dark:text-white">
          {children}
        </span>{" "}
        {label}
      </span>
    </div>
  );
}
