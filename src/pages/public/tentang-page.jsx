import { Compass, Eye, Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";

export default function TentangPage() {
  return (
    <PublicPage
      badge="Tentang Kami"
      title="Tentang Almuhsin App"
      description="Almuhsin App adalah sistem informasi pondok pesantren berbasis web yang membantu digitalisasi administrasi — dari manajemen santri, presensi, keuangan, hingga laporan."
    >
      <PageSection
        title="Apa itu Almuhsin App?"
        description="Almuhsin App lahir dari kebutuhan pondok pesantren akan administrasi yang modern, terstruktur, dan mudah digunakan. Seluruh kegiatan administrasi — data santri, presensi harian, tagihan SPP, pembayaran, hingga laporan keuangan — dikelola dalam satu platform terintegrasi."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Rocket,
              title: "Misi Kami",
              text: "Mendigitalisasi administrasi pondok agar pengurus dan ustadz fokus pada pendidikan, bukan pada tumpukan kertas.",
            },
            {
              icon: Eye,
              title: "Visi Kami",
              text: "Menjadi platform administrasi pondok pesantren terpercaya yang mendukung pengelolaan modern di seluruh Indonesia.",
            },
            {
              icon: Sparkles,
              title: "Nilai Kami",
              text: "Sederhana, cepat, aman, dan selalu mengutamakan kebutuhan nyata pondok dalam setiap fitur.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Untuk Siapa?"
        description="Almuhsin App dirancang untuk seluruh peran di lingkungan pondok pesantren."
        className="mt-16"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Super Admin", text: "Mengelola seluruh master data dan memantau semua modul." },
            { icon: Users, title: "Asatidz / Ustadz", text: "Mencatat presensi dan memantau kehadiran santri." },
            { icon: Compass, title: "Bendahara", text: "Mengelola tagihan, pembayaran, dan laporan keuangan." },
            { icon: Sparkles, title: "Keamanan", text: "Mengatur pengumpulan HP dan perizinan santri." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <item.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </PublicPage>
  );
}
