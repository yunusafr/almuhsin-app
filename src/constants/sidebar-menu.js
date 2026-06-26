import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCog,
  ClipboardCheck,
  Shield,
  Wallet,
  FileText,
} from "lucide-react";

export const sidebarMenus = {
  "Super Admin": [
    {
      title: "Dashboard",
      path: "/app",
      icon: LayoutDashboard,
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
      title: "Rekap Harian",
      path: "/app/rekap-harian",
      icon: ClipboardCheck,
    },

    {
      title: "Rekap Bulanan",
      path: "/app/rekap-bulanan",
      icon: ClipboardCheck,
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
