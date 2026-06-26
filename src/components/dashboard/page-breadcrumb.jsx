import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const breadcrumbNameMap = {
  app: "Dashboard",
  santri: "Santri",
  kelas: "Kelas",
  asatidz: "Asatidz",
  invoice: "Invoice",
  pembayaran: "Pembayaran",
  laporan: "Laporan",
  keuangan: "Keuangan",
  presensi: "Presensi",
  "tahun-pelajaran": "Tahun Pelajaran",
};

export default function PageBreadcrumb() {
  const location = useLocation();

  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
      <Home size={16} />

      {paths.map((path, index) => {
        const href = "/" + paths.slice(0, index + 1).join("/");

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight size={14} />

            <Link
              to={href}
              className={
                index === paths.length - 1
                  ? "font-semibold text-foreground"
                  : "hover:text-primary"
              }
            >
              {breadcrumbNameMap[path] ??
                path
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
