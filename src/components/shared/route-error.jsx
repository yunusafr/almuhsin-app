import { useRouteError, Link } from "react-router-dom";
import { TriangleAlert, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Layar error ramah untuk error render pada level route (React Router).
 * Menggantikan stack trace mentah bawaan React Router.
 */
export default function RouteError() {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <TriangleAlert className="h-7 w-7" />
        </div>

        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Terjadi kesalahan
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Maaf, halaman ini gagal dimuat. Silakan coba muat ulang atau kembali ke
          halaman utama.
        </p>

        {error?.message ? (
          <pre className="mt-4 max-h-28 overflow-auto rounded-lg bg-slate-100 p-3 text-left text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {String(error.message)}
          </pre>
        ) : null}

        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={() => window.location.reload()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Muat Ulang
          </Button>
          <Button
            variant="outline"
            render={<Link to="/" />}
            nativeButton={false}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Halaman Utama
          </Button>
        </div>
      </div>
    </div>
  );
}
