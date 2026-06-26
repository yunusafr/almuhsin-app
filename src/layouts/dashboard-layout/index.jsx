import { Outlet } from "react-router-dom";

import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import MobileBottomBar from "@/components/dashboard/mobile-bottom-bar";
import PageBreadcrumb from "@/components/dashboard/page-breadcrumb";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <>
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex-1 overflow-auto bg-slate-50 p-6 pb-24 lg:pb-6">
            <PageBreadcrumb />

            <Outlet />
          </main>
        </div>

        <MobileBottomBar />
      </>
    </div>
  );
}
