import { BadgeCheck, Download, ExternalLink, Fingerprint, GraduationCap, ListFilter, Users } from "lucide-react";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";

const features = [
  {
    icon: GraduationCap,
    title: "Data Lengkap & Terstruktur",
    description:
      "Catat NIS, nama, tempat & tanggal lahir, alamat, wali, hingga kontak orang tua dalam satu profil santri yang rapi.",
  },
  {
    icon: Fingerprint,
    title: "NIS Unik & Terlacak",
    description:
      "Setiap santri memiliki NIS unik yang menjadi identitas di seluruh modul — presensi, tagihan, hingga pembayaran.",
  },
  {
    icon: ListFilter,
    title: "Rombel, Tingkat & Status",
    description:
      "Kelompokkan santri berdasarkan rombel dan tingkat, dengan status yang jelas: aktif, lulus, keluar, atau mutasi.",
  },
  {
    icon: ExternalLink,
    title: "Tarik Data Eksternal",
    description:
      "Ambil data santri langsung dari sistem pusat melalui pencarian dan sinkronisasi — tanpa entri ulang manual.",
  },
  {
    icon: BadgeCheck,
    title: "Validasi & Filter Cepat",
    description:
      "Filter berdasarkan status, rombel, dan tingkat, plus pencarian instan berdasarkan NIS atau nama.",
  },
  {
    icon: Download,
    title: "Ekspor CSV",
    description:
      "Unduh data santri terfilter ke format CSV yang bisa dibuka di Excel untuk kebutuhan pelaporan.",
  },
];

export default function ProdukSantriPage() {
  return (
    <PublicPage
      badge="Modul Produk"
      title="Manajemen Santri"
      description="Kelola seluruh data santri pondok — dari pendaftaran, identitas, wali, hingga status — dalam satu tempat yang rapi dan mudah dicari."
    >
      <PageSection
        title="Semua Data Santri, Satu Tempat"
        description="Modul Santri dirancang untuk memudahkan administrasi data santri harian di pondok."
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
        title="Manfaat untuk Pondok"
        description="Data santri yang terpusat dan akurat menjadi fondasi bagi seluruh modul lain di Almuhsin App."
        className="mt-16"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Presensi dan tagihan otomatis tertaut ke data santri",
            "Pencarian data cepat saat wali bertanya",
            "Laporan jumlah santri per rombel, tingkat, dan status",
          ].map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
              <span className="text-slate-700 dark:text-slate-300">{point}</span>
            </div>
          ))}
        </div>
      </PageSection>
    </PublicPage>
  );
}
