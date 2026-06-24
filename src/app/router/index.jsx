import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layouts/public-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

import LandingPage from "@/pages/public/landing-page";
import LoginPage from "@/pages/auth/login-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import SantriPage from "@/pages/santri/santri-page";

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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "santri",
        element: <SantriPage />,
      },
    ],
  },
]);
