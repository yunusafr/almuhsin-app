import { Outlet } from "react-router-dom";

import ScrollToTop from "@/components/common/scroll-to-top";
import BackToTop from "@/components/common/back-to-top";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <ScrollToTop />
      <Outlet />
      <BackToTop />
    </div>
  );
}
