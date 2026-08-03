import { BadgePercent, HandCoins, Layers, ReceiptText, Wallet, Banknote } from "lucide-react";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";

const features = [
  {
    icon: Layers,
    title: "Tagihan Masal Sekaligus",
    description:
      "Buat tagihan SPP untuk banyak santri sekaligus dengan item rinci — SPP normal, PKL, beasiswa, daftar ulang, dan lainnya.",
  },
  {
    icon: ReceiptText,
    title: "Nomor Invoice Otomatis",
    description:
      "Setiap tagihan mendapat nomor invoice unik dan tercatat rapi dengan total, terbayar, serta sisa tagihan.",
  },
  {
    icon: HandCoins,
    title: "Pembayaran Multi Metode",
    description:
      "Catat pembayaran tunai, transfer bank, atau e-wallet lengkap dengan nomor referensi dan catatan.",
  },
  {
    icon: Banknote,
    title: "Riwayat per Tagihan",
    description:
      "Lihat seluruh riwayat pembayaran setiap tagihan — siapa kasirnya, kapan, dan metode apa yang dipakai.",
  },
  {
    icon: BadgePercent,
    title: "Status Tagihan Jelas",
    description:
      "Pantau status tiap tagihan: lunas, angsuran, jatuh tempo, atau tunggakan — terlihat sekilas dari daftar.",
  },
  {
    icon: Wallet,
    title: "Saldo & Kolektibilitas",
    description:
      "Saldo santri dan tingkat kolektibilitas pembayaran tersaji otomatis untuk evaluasi keuangan pondok.",
  },
];

export default function ProdukKeuanganPage() {
  return (
    <PublicPage
      badge="Modul Produk"
      title="Keuangan & Tagihan"
      description="Kelola seluruh siklus keuangan pondok — dari pembuatan tagihan masal, pencatatan pembayaran, hingga pantauan tunggakan."
    >
      <PageSection
        title="Siklus Keuangan yang Tertata"
        description="Bendahara mengelola tagihan dan pembayaran SPP tanpa spreadsheet yang berantakan."
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
        title="Transparan dan Mudah Diaudit"
        description="Setiap rupiah tercatat: siapa membayar, untuk tagihan apa, kapan, dan melalui metode apa."
        className="mt-16"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Tagihan masal menghemat waktu berjam-jam setiap bulan",
            "Riwayat pembayaran lengkap untuk audit keuangan",
            "Tunggakan terdeteksi lebih awal sebelum membengkak",
          ].map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
              <span className="text-slate-700 dark:text-slate-300">{point}</span>
            </div>
          ))}
        </div>
      </PageSection>
    </PublicPage>
  );
}
