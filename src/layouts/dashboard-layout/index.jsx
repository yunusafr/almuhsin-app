import { Outlet, useLocation } from "react-router-dom";

import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import MobileBottomBar from "@/components/dashboard/mobile-bottom-bar";
import PageBreadcrumb from "@/components/dashboard/page-breadcrumb";
import ScrollToTop from "@/components/common/scroll-to-top";
import BackToTop from "@/components/common/back-to-top";
import IdleLogout from "@/components/common/idle-logout";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <IdleLogout />

      <>
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />

          <main
            data-scroll-container
            className="flex-1 overflow-auto bg-slate-50 p-6 pb-24 lg:pb-6 dark:bg-slate-950"
          >
            <ScrollToTop />

            <div
              key={location.pathname}
              className="page-enter w-full max-w-full"
            >
              <PageBreadcrumb />
              <Outlet />
            </div>
          </main>
        </div>

        <MobileBottomBar />
        <BackToTop />
      </>
    </div>
  );
}
