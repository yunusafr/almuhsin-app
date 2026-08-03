/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layouts/public-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

import ProtectedRoute from "@/app/router/protected-route";

const LandingPage = lazy(() => import("@/pages/public/landing-page"));
const TentangPage = lazy(() => import("@/pages/public/tentang-page"));
const KontakPage = lazy(() => import("@/pages/public/kontak-page"));
const BantuanPage = lazy(() => import("@/pages/public/bantuan-page"));
const KebijakanPrivasiPage = lazy(() => import("@/pages/public/kebijakan-privasi-page"));
const SyaratKetentuanPage = lazy(() => import("@/pages/public/syarat-ketentuan-page"));
const ProdukSantriPage = lazy(() => import("@/pages/public/produk/santri-page"));
const ProdukPresensiPage = lazy(() => import("@/pages/public/produk/presensi-page"));
const ProdukKeuanganPage = lazy(() => import("@/pages/public/produk/keuangan-page"));
const ProdukLaporanPage = lazy(() => import("@/pages/public/produk/laporan-page"));
const LoginPage = lazy(() => import("@/pages/auth/login-page"));
const DashboardPage = lazy(() => import("@/pages/dashboard/dashboard-page"));
const SantriPage = lazy(() => import("@/pages/santri/santri-page"));
const AcademicYearPage = lazy(() => import("@/pages/academic-year/academic-year-page"));
const ClassPage = lazy(() => import("@/pages/kelas/class-page"));
const TeacherPage = lazy(() => import("@/pages/asatidz/teacher-page"));
const PresensiPage = lazy(() => import("@/pages/presensi/presensi-page"));
const RekapHarianPage = lazy(() => import("@/pages/rekap/rekap-harian-page"));
const RekapBulananPage = lazy(() => import("@/pages/rekap/rekap-bulanan-page"));
const InvoicePage = lazy(() => import("@/pages/invoice/invoice-page"));
const PembayaranPage = lazy(() => import("@/pages/pembayaran/pembayaran-page"));
const LaporanPage = lazy(() => import("@/pages/laporan/laporan-page"));
const ProfilPage = lazy(() => import("@/pages/profil/profil-page"));
const PengaturanPage = lazy(() => import("@/pages/pengaturan/pengaturan-page"));
const ComingSoonPage = lazy(() => import("@/pages/misc/coming-soon-page"));
const NotFoundPage = lazy(() => import("@/pages/misc/not-found-page"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "tentang",
        element: <TentangPage />,
      },
      {
        path: "kontak",
        element: <KontakPage />,
      },
      {
        path: "bantuan",
        element: <BantuanPage />,
      },
      {
        path: "kebijakan-privasi",
        element: <KebijakanPrivasiPage />,
      },
      {
        path: "syarat-ketentuan",
        element: <SyaratKetentuanPage />,
      },
      {
        path: "produk/santri",
        element: <ProdukSantriPage />,
      },
      {
        path: "produk/presensi",
        element: <ProdukPresensiPage />,
      },
      {
        path: "produk/keuangan",
        element: <ProdukKeuanganPage />,
      },
      {
        path: "produk/laporan",
        element: <ProdukLaporanPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "santri",
        element: <SantriPage />,
      },
      {
        path: "tapel",
        element: <AcademicYearPage />,
      },
      {
        path: "kelas",
        element: <ClassPage />,
      },
      {
        path: "asatidz",
        element: <TeacherPage />,
      },
      {
        path: "presensi",
        element: <PresensiPage />,
      },
      {
        path: "rekap-harian",
        element: <RekapHarianPage />,
      },
      {
        path: "rekap-bulanan",
        element: <RekapBulananPage />,
      },
      {
        path: "invoice",
        element: <InvoicePage />,
      },
      {
        path: "pembayaran",
        element: <PembayaranPage />,
      },
      {
        path: "laporan",
        element: <LaporanPage />,
      },
      {
        path: "profil",
        element: <ProfilPage />,
      },
      {
        path: "pengaturan",
        element: <PengaturanPage />,
      },
      {
        path: "hp",
        element: (
          <ComingSoonPage
            title="Pengumpulan HP"
            description="Kelola pengumpulan dan pengembalian handphone santri."
          />
        ),
      },
      {
        path: "perizinan",
        element: (
          <ComingSoonPage
            title="Perizinan"
            description="Kelola izin keluar masuk santri."
          />
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
