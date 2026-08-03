import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import FeaturesSection from "@/components/landing/features-section";
import RolesSection from "@/components/landing/roles-section";
import FaqSection from "@/components/landing/faq-section";
import Footer from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main>
        <Hero />
        <FeaturesSection />
        <RolesSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
