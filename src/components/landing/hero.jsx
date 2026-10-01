import { ArrowRight, Building2, GraduationCap, LogIn, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { hero, pesantren } from "@/constants/profil-pesantren";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      {/* Latar belakang bergaya lembut, tanpa gambar dari luar */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[150px]" />
        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-emerald-300/20 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-amber-200/30 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle,#15803D 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
              <Sparkles className="h-4 w-4" />
              {pesantren.kota}
            </div>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-slate-900 lg:text-6xl dark:text-white">
              {pesantren.nama}
              <span className="mt-3 block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-2xl font-bold leading-snug text-transparent lg:text-3xl">
                {hero.motto}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">{hero.kalimat}</p>

            <p className="mt-6 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {pesantren.alamat}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="h-13 rounded-2xl bg-green-600 px-7 text-base font-semibold text-white hover:bg-green-700"
                render={<a href="#profil" />}
                nativeButton={false}
              >
                <Building2 className="mr-2 h-5 w-5" />
                Profil Pesantren
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-13 rounded-2xl px-7 text-base font-semibold"
                render={<Link to="/app" />}
                nativeButton={false}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Masuk Aplikasi
              </Button>
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Tombol Masuk Aplikasi untuk ustadz, bendahara, dan petugas keamanan.
            </p>
          </div>

          {/* Penanda foto: belum memakai gambar dari internet */}
          <div className="flex h-80 w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 dark:border-green-800 dark:from-green-950/40 dark:to-emerald-950/30 dark:text-green-300 lg:h-[26rem]">
            <GraduationCap className="h-10 w-10" />
            <span className="text-base font-semibold">Foto Pesantren</span>
            <span className="text-sm opacity-70">Foto menyusul</span>
            <a href="#profil" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold underline">
              Lihat profil <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
