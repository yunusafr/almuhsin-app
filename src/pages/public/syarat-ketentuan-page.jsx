import { FileCheck, KeyRound, Scale, ShieldAlert } from "lucide-react";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";

const sections = [
  {
    icon: FileCheck,
    title: "Penerimaan Ketentuan",
    paragraphs: [
      "Dengan menggunakan Almuhsin App, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan yang tercantum dalam halaman ini.",
      "Jika tidak setuju dengan sebagian atau seluruh ketentuan, pengguna tidak diperkenankan menggunakan layanan ini.",
    ],
  },
  {
    icon: KeyRound,
    title: "Akun & Keamanan",
    paragraphs: [
      "Setiap pengguna bertanggung jawab menjaga kerahasiaan akun dan kata sandinya, serta seluruh aktivitas yang terjadi pada akun tersebut.",
      "Akun diberikan sesuai peran (Super Admin, Asatidz, Bendahara, Keamanan) dan hanya boleh digunakan untuk kepentingan administrasi pondok.",
    ],
  },
  {
    icon: Scale,
    title: "Penggunaan Layanan",
    paragraphs: [
      "Data yang dimasukkan ke dalam sistem adalah tanggung jawab pengguna yang memasukkannya dan harus sesuai dengan ketentuan yang berlaku di pondok.",
      "Pengguna dilarang menyalahgunakan akses, membagikan akun kepada pihak lain, atau menggunakan layanan untuk tujuan di luar administrasi pondok.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Batasan Tanggung Jawab",
    paragraphs: [
      "Layanan disediakan sebagaimana adanya. Kami berupaya menjaga ketersediaan dan keakuratan sistem, namun tidak menjamin layanan bebas dari gangguan.",
      "Pengguna bertanggung jawab melakukan verifikasi data penting secara berkala dan menjaga keamanan perangkat yang digunakan untuk mengakses sistem.",
    ],
  },
];

export default function SyaratKetentuanPage() {
  return (
    <PublicPage
      badge="Legal"
      title="Syarat & Ketentuan"
      description="Ketentuan penggunaan layanan Almuhsin App yang berlaku bagi seluruh pengguna."
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
          title="Perubahan Ketentuan"
          description="Ketentuan dapat diperbarui sewaktu-waktu. Penggunaan lanjutan atas layanan setelah perubahan dianggap sebagai persetujuan terhadap ketentuan terbaru."
        />
      </div>
    </PublicPage>
  );
}
