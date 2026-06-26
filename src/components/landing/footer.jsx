import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const productMenus = [
  "Dashboard",
  "Presensi",
  "Keuangan",
  "Perizinan",
  "Laporan",
];

const companyMenus = ["Tentang", "Fitur", "Roadmap", "FAQ", "Kontak"];

const supportMenus = [
  "Dokumentasi",
  "API",
  "Bantuan",
  "Privacy Policy",
  "Terms of Service",
];

export default function Footer() {
  return (
    <footer className="border-t bg-white text-slate-300">
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-600/20 blur-[180px]" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-[150px]" />
      </div>

      <div className="relative container mx-auto px-6 mt-30">
        {/* CTA */}

        <div className="-mt-20 rounded-[32px] border border-white/10 bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 p-10 shadow-[0_40px_120px_rgba(22,163,74,.45)] lg:p-14">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                Mulai Digitalisasi Pondok Anda
              </span>

              <h2 className="mt-5 text-3xl font-bold text-white lg:text-5xl">
                Kelola Pondok Pesantren
                <br />
                Lebih Mudah Bersama Almuhsin App
              </h2>

              <p className="mt-5 max-w-xl text-green-100">
                Satu platform untuk mengelola santri, presensi, pembayaran,
                administrasi, dan laporan pondok secara modern, cepat, dan
                terintegrasi.
              </p>
            </div>

            <Button
              size="lg"
              className="h-14 rounded-2xl bg-white px-8 text-base font-semibold text-green-700 hover:bg-slate-100"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Footer */}

        <div className="grid gap-16 py-24 lg:grid-cols-5">
          {/* Brand */}

          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-green-600 to-green-500 text-white shadow-xl shadow-green-700/40">
                A
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Almuhsin App
                </h2>

                <p className="text-sm text-slate-400">
                  ERP Pondok Pesantren Modern
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-md leading-8 text-slate-400">
              Almuhsin App adalah sistem informasi pondok pesantren berbasis web
              yang membantu digitalisasi administrasi, presensi, keuangan, serta
              manajemen santri dalam satu platform yang modern.
            </p>

            <div className="mt-8 space-y-4 text-sm ">
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-green-400" />
                Indonesia
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={18} className="text-green-400" />
                +62 xxx xxxx xxxx
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={18} className="text-green-400" />
                support@almuhsin.app
              </div>
            </div>
          </div>

          {/* Product */}

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Produk</h3>

            <ul className="mt-6 space-y-4">
              {productMenus.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 transition hover:text-green-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Perusahaan</h3>

            <ul className="mt-6 space-y-4">
              {companyMenus.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 transition hover:text-green-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Bantuan</h3>

            <ul className="mt-6 space-y-4">
              {supportMenus.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 transition hover:text-green-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-slate-500 lg:flex-row">
          <p>© {new Date().getFullYear()} Almuhsin App. All rights reserved.</p>

          <p>Developed by Almuhsin Universe</p>
        </div>
      </div>
    </footer>
  );
}
