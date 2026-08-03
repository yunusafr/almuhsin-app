import { Check } from "lucide-react";

import { landingRoles } from "@/constants/landing-menu";

import SectionHeading from "./section-heading";

export default function RolesSection() {
  return (
    <section
      id="roles"
      className="scroll-mt-24 bg-slate-100/60 py-24 dark:bg-slate-900/40"
    >
      <div className="container mx-auto px-6">
        <SectionHeading
          badge="Hak Akses"
          title="Setiap Peran, Punya Porsinya Masing-masing"
          description="Sistem hak akses berbasis peran memastikan setiap pengguna hanya melihat dan mengelola data sesuai tugasnya."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {landingRoles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.title}
                className="flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${role.color}`}
                >
                  <Icon size={26} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                  {role.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {role.description}
                </p>

                <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                  {role.features.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                        <Check size={12} strokeWidth={3} />
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
