import { CheckCircle2 } from "lucide-react";

import { landingFeatures } from "@/constants/landing-menu";

import SectionHeading from "./section-heading";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-24 py-24"
    >
      <div className="container mx-auto px-6">
        <SectionHeading
          badge="Fitur Unggulan"
          title="Semua Kebutuhan Administrasi Pondok"
          description="Satu platform untuk mengelola santri, presensi, keuangan, dan laporan — dirancang khusus untuk kebutuhan pondok pesantren modern."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {landingFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600/10 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={26} className="text-green-600 group-hover:text-white" />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 dark:text-green-400">
                  <CheckCircle2 size={15} />
                  Tersedia
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
