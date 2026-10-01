import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Footer from "@/components/landing/footer";
import {
  BeritaSection,
  FasilitasSection,
  KontakSection,
  ProfilSection,
  ProgramSection,
} from "@/components/landing/pesantren-sections";

/**
 * Halaman depan = PROFIL PONDOK PESANTREN (bukan pengenalan aplikasi).
 * Isi teks/foto diambil dari src/constants/profil-pesantren.js.
 * Masuk ke aplikasi administrasi lewat tombol "Masuk Aplikasi" (/app).
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main>
        <Hero />
        <ProfilSection />
        <ProgramSection />
        <FasilitasSection />
        <BeritaSection />
        <KontakSection />
      </main>

      <Footer />
    </div>
  );
}
