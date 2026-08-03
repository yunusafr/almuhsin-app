import { ShieldCheck, Database, Lock, UserCheck } from "lucide-react";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";

const sections = [
  {
    icon: Database,
    title: "Data yang Kami Kumpulkan",
    paragraphs: [
      "Almuhsin App mengumpulkan data yang diperlukan untuk menjalankan administrasi pondok, antara lain: data santri (nama, NIS, tanggal lahir, alamat, wali, dan kontak), data asatidz, data presensi, serta data tagihan dan pembayaran.",
      "Data dimasukkan oleh pengurus atau ustadz yang memiliki akun resmi sesuai peran masing-masing.",
    ],
  },
  {
    icon: UserCheck,
    title: "Penggunaan Data",
    paragraphs: [
      "Data digunakan semata-mata untuk keperluan administrasi pondok: pencatatan presensi, pembuatan tagihan, pencatatan pembayaran, dan penyusunan laporan.",
      "Data tidak pernah dijual, disewakan, atau dibagikan kepada pihak ketiga di luar kepentingan operasional pondok.",
    ],
  },
  {
    icon: Lock,
    title: "Keamanan & Penyimpanan",
    paragraphs: [
      "Akses ke aplikasi dilindungi autentikasi dan sistem hak akses berbasis peran — setiap pengguna hanya dapat mengakses data sesuai tugasnya.",
      "Komunikasi data dienkripsi melalui koneksi yang aman, dan cadangan data dikelola untuk mencegah kehilangan data.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Hak Pengguna",
    paragraphs: [
      "Pengurus pondok berhak memperbarui atau mengoreksi data santri dan data lainnya melalui aplikasi.",
      "Jika ada pertanyaan tentang data yang tersimpan, silakan hubungi tim dukungan melalui support@almuhsin.app.",
    ],
  },
];

export default function KebijakanPrivasiPage() {
  return (
    <PublicPage
      badge="Kebijakan"
      title="Kebijakan Privasi"
      description="Bagaimana Almuhsin App mengumpulkan, menggunakan, dan melindungi data pondok Anda."
    >
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <section.icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
            </div>

            <div className="mt-5 space-y-4">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="leading-8 text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}

        <PageSection
          title="Perubahan Kebijakan"
          description="Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan akan diumumkan melalui halaman ini."
        />
      </div>
    </PublicPage>
  );
}
