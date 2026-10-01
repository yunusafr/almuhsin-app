import { useState } from "react";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicNews } from "@/features/berita/hooks/use-news";
import { formatDate, listData, listPagination } from "@/lib/utils";

export default function DaftarBeritaPage() {
  const [halaman, setHalaman] = useState(1);
  const { data, isLoading } = usePublicNews({ per_page: 9, page: halaman });

  const daftar = listData(data);
  const paginasi = listPagination(data);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
          <Newspaper className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          Berita &amp; Pengumuman
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Kabar terbaru dari Pondok Pesantren Al-Muhsin Kota Blitar.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-72 w-full rounded-2xl" />
          ))}
        </div>
      ) : daftar.length === 0 ? (
        <p className="mt-14 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          Belum ada berita yang diterbitkan.
        </p>
      ) : (
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {daftar.map((b) => (
            <Link
              key={b.id}
              to={`/berita/${b.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              {b.cover_url ? (
                <img src={b.cover_url} alt={b.title} className="h-44 w-full object-cover" />
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <Newspaper className="h-8 w-8" />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                    {b.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(b.published_at ?? b.created_at)}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-bold leading-7 text-slate-900 dark:text-white">
                  {b.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {b.excerpt ?? `${String(b.body ?? "").slice(0, 140)}…`}
                </p>

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-700 group-hover:gap-2 dark:text-green-400">
                  Baca selengkapnya
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {paginasi && paginasi.last_page > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            disabled={paginasi.current_page <= 1}
            onClick={() => setHalaman((p) => Math.max(1, p - 1))}
          >
            Sebelumnya
          </Button>
          <span className="text-sm text-slate-500">
            Halaman {paginasi.current_page} dari {paginasi.last_page}
          </span>
          <Button
            variant="outline"
            disabled={paginasi.current_page >= paginasi.last_page}
            onClick={() => setHalaman((p) => p + 1)}
          >
            Berikutnya
          </Button>
        </div>
      )}
    </div>
  );
}
