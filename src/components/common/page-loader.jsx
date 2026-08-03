import { Loader2 } from "lucide-react";

/**
 * Fallback saat chunk halaman dimuat secara lazy.
 */
export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />

        <p className="text-sm text-muted-foreground">Memuat halaman...</p>
      </div>
    </div>
  );
}
