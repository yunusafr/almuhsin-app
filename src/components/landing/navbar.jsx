import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";

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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

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

            {/* Desktop */}

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

            {/* Action */}

            <div className="hidden items-center gap-3 lg:flex">
              <Button
                className="h-10 rounded-2xl bg-slate-100 px-5 text-base font-semibold text-slate-700 hover:bg-slate-200"
                asChild
              >
                <NavLink to="/login">Login</NavLink>
              </Button>

              <Button
                asChild
                className="h-10 rounded-2xl bg-green-600 px-5 text-base font-semibold text-white hover:bg-green-700"
              >
                <NavLink to="/login">Mulai Sekarang</NavLink>
              </Button>
            </div>

            {/* Mobile */}

            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}

      <div
        className={`fixed left-0 top-20 z-40 w-full overflow-hidden border-b bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 lg:hidden ${
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-5">
            {menus.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-slate-700 transition hover:text-green-600 dark:text-slate-200"
              >
                {item.title}
              </a>
            ))}

            <div className="mt-4 flex gap-3">
              <Button variant="outline" asChild className="flex-1 rounded-xl">
                <Link to="/login">Login</Link>
              </Button>

              <Button
                asChild
                className="flex-1 rounded-xl bg-green-600 hover:bg-green-700"
              >
                <Link to="/login">Mulai</Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              className="justify-start rounded-xl"
              onClick={() => setDark(!dark)}
            >
              {dark ? (
                <>
                  <Sun size={18} className="mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} className="mr-2" />
                  Dark Mode
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
