import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, BellOff, Globe, Menu, Moon, Search, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserDropdown from "./user-dropdown";

import { useSidebarStore } from "@/app/store/sidebar-store";
import useAuthStore from "@/features/auth/stores/auth-store";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export default function Navbar() {
  const { toggle } = useSidebarStore();
  const { resolvedTheme, toggleTheme } = useThemeToggle();

  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = search.trim();

    if (!keyword) return;

    navigate(`/app/santri?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={toggle}
          >
            <Menu size={20} />
          </Button>

          <div className="hidden xl:block">
            <h2 className="font-semibold">Halo, {user?.name} </h2>

            <p className="text-xs text-muted-foreground">
              Selamat datang kembali
            </p>
          </div>
        </div>

        {/* Center */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex w-full max-w-md"
        >
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari santri... (Enter untuk mencari)"
              className="pl-10 rounded-xl"
            />
          </div>
        </form>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            aria-label="Kembali ke landing page"
            title="Kembali ke landing page"
            nativeButton={false}
            render={<Link to="/" />}
          >
            <Globe size={18} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-xl"
                  aria-label="Notifikasi"
                />
              }
            >
              <Bell size={18} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-72 p-0">
              <div className="border-b p-4">
                <h3 className="font-semibold">Notifikasi</h3>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
                <BellOff size={28} className="text-muted-foreground/50" />

                <p className="text-sm font-medium">Tidak ada notifikasi</p>

                <p className="text-xs text-muted-foreground">
                  Notifikasi baru akan muncul di sini.
                </p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={toggleTheme}
            aria-label="Ganti tema"
          >
            {resolvedTheme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </Button>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
