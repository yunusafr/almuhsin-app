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
  super_admin: [
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

  asatidz: [
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

  keamanan: [
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

  bendahara: [
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
