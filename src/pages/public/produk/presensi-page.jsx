import { CalendarCheck, CalendarRange, ClipboardCheck, Filter, Moon, Users } from "lucide-react";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";

const features = [
  {
    icon: ClipboardCheck,
    title: "4 Jenis Presensi",
    description:
      "Catat kehadiran sholat, ngaji, ekstrakurikuler, dan ngaji pasan — masing-masing dengan catatan tersendiri.",
  },
  {
    icon: CalendarCheck,
    title: "Status Kehadiran Lengkap",
    description:
      "Setiap santri diberi status hadir, izin, sakit, atau alfa dengan warna yang mudah dikenali.",
  },
  {
    icon: Filter,
    title: "Filter Kelas & Tanggal",
    description:
      "Isi presensi per kelas dan tanggal — daftar santri otomatis mengikuti rombel yang dipilih.",
  },
  {
    icon: CalendarRange,
    title: "Rekap Harian & Bulanan",
    description:
      "Rekap kehadiran tersusun otomatis, harian maupun bulanan, tanpa hitung manual.",
  },
  {
    icon: Users,
    title: "Per Santri per Status",
    description:
      "Ringkasan jumlah santri per status kehadiran tampil langsung saat mengisi presensi.",
  },
  {
    icon: Moon,
    title: "Catatan Sub-Tipe",
    description:
      "Dukungan sub-tipe untuk kebutuhan khusus, seperti jenis kegiatan ekstrakurikuler.",
  },
];

export default function ProdukPresensiPage() {
  return (
    <PublicPage
      badge="Modul Produk"
      title="Presensi Digital"
      description="Catat kehadiran santri dengan cepat — sholat, ngaji, dan ekstrakurikuler — lalu biarkan rekap tersusun otomatis."
    >
      <PageSection
        title="Presensi Tanpa Kertas"
        description="Ustadz cukup memilih kelas dan tanggal, lalu menandai status kehadiran tiap santri dalam hitungan detik."
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
        title="Data Presensi yang Bisa Dipercaya"
        description="Setiap catatan presensi tersimpan rapi dan tertaut ke tahun ajaran serta kelas yang sedang aktif."
        className="mt-16"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Rekap kehadiran per santri siap dilaporkan ke wali",
            "Riwayat presensi tersimpan per tahun ajaran",
            "Dasar penilaian kehadiran yang objektif dan transparan",
          ].map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
              <span className="text-slate-700 dark:text-slate-300">{point}</span>
            </div>
          ))}
        </div>
      </PageSection>
    </PublicPage>
  );
}
