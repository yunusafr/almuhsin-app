import { Bell, Menu, Moon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import UserDropdown from "./user-dropdown";

import { useSidebarStore } from "@/app/store/sidebar-store";
import useAuthStore from "@/features/auth/stores/auth-store";

export default function Navbar() {
  const { toggle } = useSidebarStore();
  const user = useAuthStore((s) => s.user);
  const roles = useAuthStore((s) => s.roles);

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
        <div className="hidden lg:flex w-full max-w-md">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Cari menu, santri, invoice..."
              className="pl-10 rounded-xl"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative rounded-xl">
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
