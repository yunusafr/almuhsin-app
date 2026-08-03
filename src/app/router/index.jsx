import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layouts/public-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

import ProtectedRoute from "@/app/router/protected-route";

import LandingPage from "@/pages/public/landing-page";
import LoginPage from "@/pages/auth/login-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import SantriPage from "@/pages/santri/santri-page";
import AcademicYearPage from "@/pages/academic-year/academic-year-page";
import ClassPage from "@/pages/kelas/class-page";
import TeacherPage from "@/pages/asatidz/teacher-page";
import PresensiPage from "@/pages/presensi/presensi-page";
import RekapHarianPage from "@/pages/rekap/rekap-harian-page";
import RekapBulananPage from "@/pages/rekap/rekap-bulanan-page";
import InvoicePage from "@/pages/invoice/invoice-page";
import PembayaranPage from "@/pages/pembayaran/pembayaran-page";
import LaporanPage from "@/pages/laporan/laporan-page";
import ComingSoonPage from "@/pages/misc/coming-soon-page";
import NotFoundPage from "@/pages/misc/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
