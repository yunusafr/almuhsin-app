import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import { usePublicNewsDetail } from "@/features/berita/hooks/use-news";
import { formatDate } from "@/lib/utils";

export default function BeritaDetailPage() {
  const { slug } = useParams();
  const { data: berita, isLoading, isError } = usePublicNewsDetail(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-6 py-16">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-6 h-10 w-full" />
        <Skeleton className="mt-3 h-10 w-2/3" />
        <Skeleton className="mt-8 h-72 w-full" />
      </div>
    );
  }

  if (isError || !berita) {
    return (
      <div className="container mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Berita tidak ditemukan</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Berita yang Anda cari tidak tersedia atau sudah tidak diterbitkan.
        </p>
        <Link
          to="/berita"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          Lihat semua berita
        </Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/berita"
        className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:gap-3 dark:text-green-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Semua berita
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
          {berita.category}
        </span>
        <span className="flex items-center gap-1.5 text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(berita.published_at ?? berita.created_at)}
        </span>
        {berita.author && (
          <span className="flex items-center gap-1.5 text-slate-500">
            <UserRound className="h-3.5 w-3.5" />
            {berita.author}
          </span>
        )}
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {berita.title}
      </h1>

      {berita.cover_url && (
        <img
          src={berita.cover_url}
          alt={berita.title}
          className="mt-8 w-full rounded-2xl object-cover"
        />
      )}

      {berita.excerpt && (
        <p className="mt-8 border-l-4 border-green-600 pl-4 text-lg font-medium leading-8 text-slate-700 dark:text-slate-300">
          {berita.excerpt}
        </p>
      )}

      <div className="mt-8 whitespace-pre-line text-base leading-8 text-slate-700 dark:text-slate-300">
        {berita.body}
      </div>
    </article>
  );
}
