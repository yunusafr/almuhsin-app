import { useLocation } from "react-router-dom";

export default function PageBreadcrumb() {
  const location = useLocation();

  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="mb-6">
      <p className="text-sm text-slate-500">{paths.join(" / ")}</p>
    </div>
  );
}
