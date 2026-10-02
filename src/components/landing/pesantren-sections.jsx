import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  Home,
  ImageIcon,
  Library,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  School,
  Sparkles,
  Target,
  Trophy,
  Users,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router-dom";

import { fasilitas, galeri, hero, pesantren, program, profil } from "@/constants/profil-pesantren";
import { usePublicNews } from "@/features/berita/hooks/use-news";
import { formatDate, listData } from "@/lib/utils";

/* ---------------------------------------------------------------- */
/*  Kepala bagian                                                    */
/* ---------------------------------------------------------------- */
function Kepala({ ikon: Ikon, judul, keterangan, terang = true }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {Ikon ? (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
          <Ikon className="h-6 w-6" />
        </div>
      ) : null}
      <h2 className={`text-3xl font-black tracking-tight lg:text-4xl ${terang ? "text-slate-900 dark:text-white" : "text-white"}`}>
        {judul}
      </h2>
      {keterangan ? (
        <p className={`mt-4 text-base leading-8 ${terang ? "text-slate-600 dark:text-slate-400" : "text-white/80"}`}>
          {keterangan}
        </p>
      ) : null}
    </div>
  );
}

/* Kotak penanda foto yang belum tersedia (tanpa gambar dari internet) */
function FotoMenyusul({ label, tinggi = "h-56" }) {
  return (
    <div className={`flex ${tinggi} w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 dark:border-green-800 dark:from-green-950/40 dark:to-emerald-950/30 dark:text-green-300`}>
      <ImageIcon className="h-7 w-7" />
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs opacity-70">Foto menyusul</span>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Profil: sejarah, visi & misi, pengasuh                           */
/* ---------------------------------------------------------------- */
export function ProfilSection() {
  return (
    <section id="profil" className="scroll-mt-24 py-20">
      <div className="container mx-auto px-6">
        <Kepala
          ikon={Building2}
          judul={`Tentang ${pesantren.namaPendek}`}
          keterangan={`${pesantren.nama}, ${pesantren.kota}.`}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sejarah Singkat</h3>
            {profil.sejarah.map((paragraf, i) => (
              <p key={i} className="text-base leading-8 text-slate-600 dark:text-slate-400">
                {paragraf}
              </p>
            ))}

            <div className="rounded-2xl border border-green-200 bg-green-50/70 p-6 dark:border-green-900 dark:bg-green-950/30">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <Target className="h-5 w-5" />
                <span className="font-bold">Visi</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{profil.visi}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <Sparkles className="h-5 w-5" />
                <span className="font-bold">Misi</span>
              </div>
              <ul className="mt-3 space-y-2">
                {profil.misi.map((m, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <figure className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-800">
              <img
                src={hero.foto}
                alt={hero.keteranganFoto}
                className="h-72 w-full object-cover"
                loading="lazy"
              />
              <figcaption className="bg-white px-5 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                {hero.keteranganFoto}
              </figcaption>
            </figure>
            <div className="grid gap-4 sm:grid-cols-2">
              {profil.pengasuh.map((p) => (
                <div key={p.jabatan} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-300">
                    <Users className="h-4 w-4" />
                    {p.jabatan}
                  </div>
                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">{p.nama}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Program pendidikan                                               */
/* ---------------------------------------------------------------- */
const IKON_PROGRAM = [BookOpen, GraduationCap, Library, School, MessageCircle, Warehouse];

export function ProgramSection() {
  return (
    <section id="program" className="scroll-mt-24 bg-white py-20 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <Kepala ikon={GraduationCap} judul="Program Pendidikan" keterangan="Kegiatan belajar dan pembinaan santri di pesantren." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {program.map((p, i) => {
            const Ikon = IKON_PROGRAM[i % IKON_PROGRAM.length];
            return (
              <div key={p.nama} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-green-300 hover:bg-green-50/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                  <Ikon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{p.nama}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{p.keterangan}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Fasilitas                                                        */
/* ---------------------------------------------------------------- */
const IKON_FASILITAS = [Home, Warehouse, School, Library, Building2, Trophy];

export function FasilitasSection() {
  return (
    <section id="fasilitas" className="scroll-mt-24 py-20">
      <div className="container mx-auto px-6">
        <Kepala ikon={Home} judul="Fasilitas" keterangan="Sarana yang menunjang kegiatan belajar dan kehidupan santri." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fasilitas.map((f, i) => {
            const Ikon = IKON_FASILITAS[i % IKON_FASILITAS.length];
            return (
              <div key={f.nama} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  <Ikon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{f.nama}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{f.keterangan}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <h3 className="text-center text-xl font-bold text-slate-900 dark:text-white">Galeri Kegiatan</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galeri.map((g) => (
              <figure
                key={g.foto}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <img
                  src={g.foto}
                  alt={g.judul}
                  loading="lazy"
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <figcaption className="p-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {g.judul}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Berita                                                           */
/* ---------------------------------------------------------------- */
export function BeritaSection() {
  const { data, isLoading } = usePublicNews({ per_page: 3 });
  const daftar = listData(data);

  return (
    <section id="berita" className="scroll-mt-24 bg-white py-20 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <Kepala ikon={CalendarDays} judul="Berita & Pengumuman" keterangan="Kabar terbaru dari Pondok Pesantren Al-Muhsin Kota Blitar." />

        {isLoading ? (
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />
            ))}
          </div>
        ) : daftar.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
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
                  <img src={b.cover_url} alt={b.title} className="h-40 w-full object-cover" />
                ) : (
                  <FotoMenyusul label="Foto berita" tinggi="h-40" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                      {b.category}
                    </span>
                    <span className="text-slate-500">{formatDate(b.published_at ?? b.created_at)}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-7 text-slate-900 dark:text-white">{b.title}</h3>
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

        <p className="mt-10 text-center">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-green-400 hover:text-green-700 dark:border-slate-700 dark:text-slate-200"
          >
            Lihat semua berita
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Kontak                                                           */
/* ---------------------------------------------------------------- */
export function KontakSection() {
  const item = [
    { ikon: MapPin, judul: "Alamat", isi: `${pesantren.alamat}, ${pesantren.kota}` },
    { ikon: Phone, judul: "Telepon", isi: pesantren.telepon },
    { ikon: MessageCircle, judul: "WhatsApp", isi: pesantren.whatsapp },
    { ikon: Mail, judul: "Surel", isi: pesantren.email },
  ];

  return (
    <section id="kontak" className="scroll-mt-24 py-20">
      <div className="container mx-auto px-6">
        <Kepala ikon={MapPin} judul="Hubungi Kami" keterangan={`Layanan administrasi: ${pesantren.jamLayanan}.`} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {item.map((k) => (
            <div key={k.judul} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                <k.ikon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">{k.judul}</p>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{k.isi}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{pesantren.nama}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{pesantren.alamat}</p>
              </div>
            </div>
            <a
              href={pesantren.petaUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Buka di Peta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
