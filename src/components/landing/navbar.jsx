import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const menus = [
  {
    title: "Beranda",
    href: "/",
  },
  {
    title: "Fitur",
    href: "#features",
  },
  {
    title: "Role",
    href: "#roles",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex h-20 items-center justify-between px-5">
            {/* Logo */}

            <Link to="/" className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-green-500 text-white shadow-lg shadow-green-600/30">
                A

                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-yellow-400" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Almuhsin App
                </h2>

                <p className="text-xs text-muted-foreground">
                  ERP Pondok Pesantren
                </p>
              </div>
            </Link>

            {/* Desktop menu */}

            <nav className="hidden items-center gap-8 lg:flex">
              {menus.map((menu) => (
                <a
                  key={menu.title}
                  href={menu.href}
                  className="relative text-sm font-medium text-slate-600 transition hover:text-green-600 dark:text-slate-300"
                >
                  {menu.title}
                </a>
              ))}
            </nav>

            {/* Desktop actions */}

            <div className="hidden items-center gap-3 lg:flex">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label="Ganti tema"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </Button>

              <Button
                className="h-10 rounded-2xl bg-slate-100 px-5 text-base font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                render={<NavLink to="/login" />}
              >
                Login
              </Button>

              <Button
                className="h-10 rounded-2xl bg-green-600 px-5 text-base font-semibold text-white hover:bg-green-700"
                render={<NavLink to="/login" />}
              >
                Mulai Sekarang
              </Button>
            </div>

            {/* Mobile toggles */}

            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label="Ganti tema"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Buka menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}

        {mobileOpen && (
          <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95">
            <div className="container mx-auto space-y-1 px-5 py-4">
              {menus.map((menu) => (
                <a
                  key={menu.title}
                  href={menu.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-green-50 hover:text-green-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {menu.title}
                </a>
              ))}

              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
              >
                Login / Mulai Sekarang
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
