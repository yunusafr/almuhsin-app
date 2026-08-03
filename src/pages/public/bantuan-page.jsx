import { BookOpen, LifeBuoy, LogIn, Mail, MonitorSmartphone, Search } from "lucide-react";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";

const quickStart = [
  {
    icon: LogIn,
    title: "1. Masuk ke Aplikasi",
    text: "Gunakan akun yang diberikan oleh pengurus. Klik tombol Login di pojok kanan atas.",
  },
  {
    icon: MonitorSmartphone,
    title: "2. Kenali Dashboard",
    text: "Dashboard menampilkan ringkasan santri, asatidz, presensi hari ini, dan keuangan.",
  },
  {
    icon: Search,
    title: "3. Gunakan Menu Sesuai Peran",
    text: "Super Admin mengelola semua modul, Asatidz fokus pada presensi, Bendahara pada keuangan.",
  },
  {
    icon: BookOpen,
    title: "4. Data Tersimpan Otomatis",
    text: "Setiap perubahan langsung tersimpan ke server — tidak perlu tombol simpan berlapis.",
  },
];

const faqs = [
  {
    q: "Bagaimana cara mendapatkan akun?",
    a: "Akun dibuat oleh Super Admin pondok. Hubungi pengurus untuk mendapatkan email dan kata sandi.",
  },
  {
    q: "Apakah bisa dipakai di HP?",
    a: "Bisa. Almuhsin App responsif dan dapat diakses dari HP, tablet, maupun komputer melalui browser.",
  },
  {
    q: "Data presensi salah, bagaimana memperbaikinya?",
    a: "Ustadz dapat mencatat ulang presensi pada tanggal dan kelas yang sama melalui menu Presensi.",
  },
  {
    q: "Bagaimana cara mencetak laporan keuangan?",
    a: "Buka menu Laporan untuk melihat ringkasan; gunakan fitur ekspor/print dari halaman terkait.",
  },
];

export default function BantuanPage() {
  return (
    <PublicPage
      badge="Pusat Bantuan"
      title="Pusat Bantuan"
      description="Panduan memulai, jawaban atas pertanyaan umum, dan cara menghubungi tim dukungan kami."
    >
      <PageSection
        title="Mulai Cepat"
        description="Empat langkah untuk mulai menggunakan Almuhsin App."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickStart.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Pertanyaan Umum"
        description="Jawaban singkat untuk pertanyaan yang paling sering diajukan."
        className="mt-16"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{faq.q}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Masih Butuh Bantuan?"
        description="Hubungi tim dukungan kami melalui email."
        className="mt-16"
      >
        <a
          href="mailto:support@almuhsin.app"
          className="group inline-flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-green-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 group-hover:text-green-600 dark:text-white dark:group-hover:text-green-300">
              support@almuhsin.app
            </p>
            <p className="text-sm text-muted-foreground">
              <Mail className="mr-1 inline h-3.5 w-3.5" />
              Kami merespons dalam 1×24 jam pada hari kerja
            </p>
          </div>
        </a>
      </PageSection>
    </PublicPage>
  );
}
