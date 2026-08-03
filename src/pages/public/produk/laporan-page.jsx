import { BarChart3, ChartPie, Gauge, TrendingUp, CircleAlert, LayoutDashboard } from "lucide-react";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Ringkasan",
    description:
      "Jumlah santri, asatidz, presensi hari ini, dan pembayaran terkumpul tampil dalam satu layar.",
  },
  {
    icon: BarChart3,
    title: "Grafik Tagihan per Bulan",
    description:
      "Visualisasi nilai tagihan bulanan memudahkan membaca tren keuangan pondok.",
  },
  {
    icon: ChartPie,
    title: "Distribusi Status Tagihan",
    description:
      "Proporsi tagihan lunas, angsuran, dan tunggakan tampil dalam diagram yang mudah dipahami.",
  },
  {
    icon: Gauge,
    title: "Tingkat Kolektibilitas",
    description:
      "Persentase pembayaran terkumpul terhadap total tagihan tersaji otomatis.",
  },
  {
    icon: CircleAlert,
    title: "Tagihan Terbesar Belum Lunas",
    description:
      "Prioritaskan penagihan dengan daftar tagihan bernilai besar yang belum dibayar.",
  },
  {
    icon: TrendingUp,
    title: "Ringkasan Keuangan",
    description:
      "Total nilai, terkumpul, dan sisa tagihan dirangkum untuk laporan pengurus pondok.",
  },
];

export default function ProdukLaporanPage() {
  return (
    <PublicPage
      badge="Modul Produk"
      title="Laporan & Statistik"
      description="Pantau kondisi pondok dalam satu layar — data santri, presensi, dan keuangan dalam grafik yang mudah dibaca."
    >
      <PageSection
        title="Keputusan Berdasarkan Data"
        description="Laporan keuangan dan statistik tersusun otomatis dari data yang sudah dicatat di seluruh modul."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Laporan untuk Pengurus"
        description="Sajikan perkembangan pondok kepada pengurus dengan data yang akurat dan terkini."
        className="mt-16"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Laporan keuangan siap dibahas dalam rapat pengurus",
            "Tren pembayaran terlihat dari grafik bulanan",
            "Data presensi mendukung evaluasi kedisiplinan santri",
          ].map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
              <span className="text-slate-700 dark:text-slate-300">{point}</span>
            </div>
          ))}
        </div>
      </PageSection>
    </PublicPage>
  );
}
