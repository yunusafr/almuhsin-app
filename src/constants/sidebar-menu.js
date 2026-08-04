import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCog,
  ClipboardCheck,
  CalendarCheck,
  CalendarRange,
  Shield,
  Wallet,
  FileText,
  ReceiptText,
  HandCoins,
  UserCheck,
} from "lucide-react";

export const sidebarMenus = {
  "Super Admin": [
    {
      title: "Dashboard",
      path: "/app",
      icon: LayoutDashboard,
    },

    {
      title: "Tahun Ajaran",
      path: "/app/tapel",
      icon: GraduationCap,
    },

    {
      title: "Santri",
      path: "/app/santri",
      icon: Users,
    },

    {
      title: "Kelas",
      path: "/app/kelas",
      icon: GraduationCap,
    },

    {
      title: "Asatidz",
      path: "/app/asatidz",
      icon: UserCog,
    },

    {
      title: "Presensi",
      path: "/app/presensi",
      icon: ClipboardCheck,
    },

    {
      title: "Presensi Guru",
      path: "/app/presensi-guru",
      icon: UserCheck,
    },

    {
      title: "Rekap Harian",
      path: "/app/rekap-harian",
      icon: CalendarCheck,
    },

    {
      title: "Rekap Bulanan",
      path: "/app/rekap-bulanan",
      icon: CalendarRange,
    },

    {
      title: "Invoice",
      path: "/app/invoice",
      icon: ReceiptText,
    },

    {
      title: "Pembayaran",
      path: "/app/pembayaran",
      icon: HandCoins,
    },

    {
      title: "Laporan",
      path: "/app/laporan",
      icon: FileText,
    },
  ],

  Asatidz: [
    {
      title: "Dashboard",
      path: "/app",
      icon: LayoutDashboard,
    },

    {
      title: "Presensi",
      path: "/app/presensi",
      icon: ClipboardCheck,
    },

    {
      title: "Rekap Harian",
      path: "/app/rekap-harian",
      icon: CalendarCheck,
    },

    {
      title: "Rekap Bulanan",
      path: "/app/rekap-bulanan",
      icon: CalendarRange,
    },
  ],

  Keamanan: [
    {
      title: "Dashboard",
      path: "/app",
      icon: LayoutDashboard,
    },

    {
      title: "Pengumpulan HP",
      path: "/app/hp",
      icon: Shield,
    },

    {
      title: "Perizinan",
      path: "/app/perizinan",
      icon: Shield,
    },

    {
      title: "Presensi Guru",
      path: "/app/presensi-guru",
      icon: UserCheck,
    },
  ],

  Bendahara: [
    {
      title: "Dashboard",
      path: "/app",
      icon: LayoutDashboard,
    },

    {
      title: "Invoice",
      path: "/app/invoice",
      icon: Wallet,
    },

    {
      title: "Pembayaran",
      path: "/app/pembayaran",
      icon: Wallet,
    },

    {
      title: "Laporan",
      path: "/app/laporan",
      icon: FileText,
    },
  ],
};
