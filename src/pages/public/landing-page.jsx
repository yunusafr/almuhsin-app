import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            Sistem Manajemen Pondok Pesantren
          </span>

          <h1 className="mt-6 text-6xl font-bold leading-tight">
            Digitalisasi Administrasi Pondok Pesantren
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Kelola santri, presensi, keuangan, perizinan, dan administrasi
            pondok dalam satu platform.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Masuk
            </Link>

            <button className="border px-6 py-3 rounded-xl">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
