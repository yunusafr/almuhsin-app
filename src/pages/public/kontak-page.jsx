import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import PublicPage from "@/components/landing/public-page-layout";
import PageSection from "@/components/landing/page-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@almuhsin.app",
    href: "mailto:support@almuhsin.app",
  },
  {
    icon: Phone,
    label: "Telepon / WhatsApp",
    value: "+62 xxx xxxx xxxx",
    href: "tel:+62xxxxxxxxxx",
  },
  {
    icon: MapPin,
    label: "Alamat",
    value: "Indonesia",
    href: null,
  },
];

export default function KontakPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const subject = encodeURIComponent(`[Kontak Almuhsin App] Pesan dari ${name}`);
    const body = encodeURIComponent(`${message}\n\nDikirim oleh: ${name} (${email})`);
    window.location.href = `mailto:support@almuhsin.app?subject=${subject}&body=${body}`;

    toast.success("Membuka aplikasi email Anda", {
      description: "Pesan Anda akan terkirim melalui email.",
    });

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <PublicPage
      badge="Kontak"
      title="Hubungi Kami"
      description="Punya pertanyaan tentang Almuhsin App, atau ingin mencoba untuk pondok Anda? Kirim pesan kepada kami."
    >
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Info kontak */}
        <div className="space-y-4 lg:col-span-2">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-0.5 block font-semibold text-slate-900 hover:text-green-600 dark:text-white dark:hover:text-green-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-green-200 bg-green-50 p-6 text-sm leading-7 text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-200">
            Tim kami merespons pesan pada hari kerja, biasanya dalam 1×24 jam.
          </div>
        </div>

        {/* Form kontak */}
        <PageSection
          title="Kirim Pesan"
          description="Isi formulir di bawah — pesan akan dibuka di aplikasi email Anda."
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Nama</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  required
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="contact-message">Pesan</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan Anda di sini..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="mt-6 h-11 rounded-xl px-6">
              <Send className="mr-2 h-4 w-4" />
              Kirim Pesan
            </Button>
          </form>
        </PageSection>
      </div>
    </PublicPage>
  );
}
