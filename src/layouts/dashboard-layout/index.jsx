import { Outlet } from "react-router-dom";

import Sidebar from "@/components/dashboard/sidebar";
import Navbar from "@/components/dashboard/navbar";
import PageBreadcrumb from "@/components/dashboard/page-breadcrumb";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto bg-slate-50 p-6">
          <PageBreadcrumb />

          <Outlet />
        </main>
      </div>
    </div>
  );
}
