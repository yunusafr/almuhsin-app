/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layouts/public-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

import ProtectedRoute from "@/app/router/protected-route";
import RoleGuard from "@/app/router/role-guard";

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
const PerizinanPage = lazy(() => import("@/pages/perizinan/perizinan-page"));
const PresensiGuruPage = lazy(() => import("@/pages/presensi-guru/presensi-guru-page"));
const HpPage = lazy(() => import("@/pages/hp/hp-page"));
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
        element: <RoleGuard roles={["Super Admin"]}><SantriPage /></RoleGuard>,
      },
      {
        path: "tapel",
        element: <RoleGuard roles={["Super Admin"]}><AcademicYearPage /></RoleGuard>,
      },
      {
        path: "kelas",
        element: <RoleGuard roles={["Super Admin"]}><ClassPage /></RoleGuard>,
      },
      {
        path: "asatidz",
        element: <RoleGuard roles={["Super Admin"]}><TeacherPage /></RoleGuard>,
      },
      {
        path: "presensi",
        element: <RoleGuard roles={["Super Admin", "Asatidz"]}><PresensiPage /></RoleGuard>,
      },
      {
        path: "presensi-guru",
        element: <RoleGuard roles={["Super Admin", "Keamanan"]}><PresensiGuruPage /></RoleGuard>,
      },
      {
        path: "rekap-harian",
        element: <RoleGuard roles={["Super Admin", "Asatidz"]}><RekapHarianPage /></RoleGuard>,
      },
      {
        path: "rekap-bulanan",
        element: <RoleGuard roles={["Super Admin", "Asatidz"]}><RekapBulananPage /></RoleGuard>,
      },
      {
        path: "invoice",
        element: <RoleGuard roles={["Super Admin", "Bendahara"]}><InvoicePage /></RoleGuard>,
      },
      {
        path: "pembayaran",
        element: <RoleGuard roles={["Super Admin", "Bendahara"]}><PembayaranPage /></RoleGuard>,
      },
      {
        path: "laporan",
        element: <RoleGuard roles={["Super Admin", "Bendahara"]}><LaporanPage /></RoleGuard>,
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
          <RoleGuard roles={["Super Admin", "Keamanan"]}>
            <HpPage />
          </RoleGuard>
        ),
      },
      {
        path: "perizinan",
        element: <RoleGuard roles={["Super Admin", "Keamanan"]}><PerizinanPage /></RoleGuard>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
