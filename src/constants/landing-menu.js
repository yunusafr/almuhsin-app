import {
  Users,
  ClipboardCheck,
  CalendarRange,
  ReceiptText,
  HandCoins,
  BarChart3,
  Shield,
  UserCog,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export const landingMenu = [
  {
    title: "Beranda",
    href: "/",
  },
  {
    title: "Fitur",
    href: "#features",
  },
  {
    title: "Role",
    href: "#roles",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

export const landingFeatures = [
  {
    icon: Users,
    title: "Manajemen Santri",
    description:
      "Kelola data santri lengkap dengan NIS, wali, rombel, dan status — plus tarik data dari sistem eksternal.",
  },
  {
    icon: ClipboardCheck,
    title: "Presensi Digital",
    description:
      "Catat kehadiran sholat, ngaji, ngaji pasan, dan ekstrakurikuler dengan status hadir, izin, sakit, atau alfa.",
  },
  {
    icon: CalendarRange,
    title: "Rekap Otomatis",
    description:
      "Rekap harian dan bulanan tersusun otomatis dari setiap presensi yang dicatat.",
  },
  {
    icon: ReceiptText,
    title: "Tagihan & Invoice",
    description:
      "Buat tagihan masal SPP untuk banyak santri sekaligus dengan rincian item yang jelas.",
  },
  {
    icon: HandCoins,
    title: "Pembayaran",
    description:
      "Catat pembayaran tunai, transfer bank, atau e-wallet lengkap dengan nomor referensi.",
  },
  {
    icon: BarChart3,
    title: "Laporan Keuangan",
    description:
      "Pantau pemasukan, tagihan tertunggak, dan statistik keuangan pondok dalam grafik yang mudah dibaca.",
  },
];

export const landingRoles = [
  {
    icon: Shield,
    title: "Super Admin",
    description:
      "Akses penuh ke seluruh modul: master data, presensi, keuangan, hingga laporan.",
    color: "bg-green-600",
    features: ["Master data santri & asatidz", "Presensi & rekap", "Invoice & pembayaran", "Laporan keuangan"],
  },
  {
    icon: UserCog,
    title: "Asatidz / Ustadz",
    description:
      "Fokus pada pencatatan presensi dan pantauan kehadiran santri setiap hari.",
    color: "bg-blue-600",
    features: ["Input presensi harian", "Lihat riwayat presensi", "Rekap kehadiran"],
  },
  {
    icon: Wallet,
    title: "Bendahara",
    description:
      "Mengelola seluruh siklus keuangan pondok dari tagihan hingga pembayaran.",
    color: "bg-amber-500",
    features: ["Buat tagihan SPP", "Catat pembayaran", "Laporan keuangan"],
  },
  {
    icon: ShieldCheck,
    title: "Keamanan",
    description:
      "Mengatur pengumpulan HP santri dan perizinan keluar masuk pondok.",
    color: "bg-orange-500",
    features: ["Pengumpulan HP", "Perizinan santri", "Riwayat keamanan"],
  },
];

export const landingFaqs = [
  {
    question: "Apa itu Almuhsin App?",
    answer:
      "Almuhsin App adalah sistem informasi pondok pesantren berbasis web untuk digitalisasi administrasi — mulai dari manajemen santri, presensi, keuangan, hingga laporan dalam satu platform.",
  },
  {
    question: "Siapa saja yang bisa menggunakan aplikasi ini?",
    answer:
      "Aplikasi ini memiliki sistem hak akses berbasis peran: Super Admin mengelola seluruh sistem, Asatidz mengisi presensi, Bendahara mengelola keuangan, dan petugas Keamanan mengelola pengumpulan HP serta perizinan.",
  },
  {
    question: "Apakah data pondok kami aman?",
    answer:
      "Ya. Seluruh akses ke API dilindungi autentikasi token (Laravel Sanctum) dan setiap pengguna hanya dapat mengakses data sesuai perannya (Spatie Permission).",
  },
  {
    question: "Bisa diakses dari HP atau tablet?",
    answer:
      "Bisa. Tampilan aplikasi responsif penuh — menu navigasi di layar kecil berubah menjadi bottom bar agar tetap nyaman digunakan dari ponsel.",
  },
  {
    question: "Apakah mendukung lebih dari satu tahun ajaran?",
    answer:
      "Ya. Anda dapat membuat banyak tahun ajaran dan mengaktifkan salah satunya. Data presensi dan tagihan tersimpan mengikuti tahun ajaran yang dipilih.",
  },
  {
    question: "Bagaimana cara memulai?",
    answer:
      "Cukup hubungi administrator pondok untuk mendapatkan akun sesuai peran Anda, lalu masuk melalui halaman Login. Tidak perlu instalasi apa pun — cukup browser.",
  },
];
