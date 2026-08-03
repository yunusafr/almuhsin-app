import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { landingFaqs } from "@/constants/landing-menu";

import SectionHeading from "./section-heading";

import { cn } from "@/lib/utils";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          badge="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          description="Temukan jawaban atas pertanyaan umum seputar Almuhsin App."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {landingFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition-colors dark:border-slate-800 dark:bg-slate-900",
                  isOpen && "border-green-300 dark:border-green-500/40",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>

                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 transition-transform duration-300 dark:bg-green-500/15 dark:text-green-400",
                      isOpen && "rotate-180",
                    )}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${index}`}
                    className="border-t border-slate-100 px-6 py-5 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:text-slate-400"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
