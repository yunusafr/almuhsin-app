import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import PageHero from "@/components/landing/page-hero";

/**
 * Kerangka halaman publik (di luar landing utama):
 * Navbar + hero + konten + footer.
 */
export default function PublicPage({ badge, title, description, children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <PageHero badge={badge} title={title} description={description} />
      <main className="mx-auto max-w-7xl px-6 py-16">{children}</main>
      <Footer />
    </div>
  );
}
