import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import ThemeToggle from "./theme-toggle";
import UserDropdown from "./user-dropdown";

import { useSidebarStore } from "@/app/store/sidebar-store";

export default function Navbar() {
  const { toggle } = useSidebarStore();

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu size={20} />
      </Button>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <UserDropdown />
      </div>
    </header>
  );
}
