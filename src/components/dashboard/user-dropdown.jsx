import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, Settings, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useAuthStore from "@/features/auth/stores/auth-store";
import { removeToken } from "@/features/auth/lib/token";

export default function UserDropdown() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const user = useAuthStore((s) => s.user);
  const roles = useAuthStore((s) => s.roles);
  const logoutStore = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    removeToken();

    logoutStore();

    queryClient.clear();

    navigate("/login", {
      replace: true,
    });
  };

  const role = roles?.[0] ?? "Super Admin";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="p-3 border-b">
          <h4 className="font-medium">{user?.name}</h4>

          <p className="text-xs text-muted-foreground capitalize">{role}</p>
        </div>

        <DropdownMenuItem onClick={() => navigate("/app/profil")}>
          <UserRound className="mr-2 h-4 w-4" />

          Profil
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/app/pengaturan")}>
          <Settings className="mr-2 h-4 w-4" />

          Pengaturan
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />

          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
