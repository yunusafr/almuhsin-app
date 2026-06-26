import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useAuthStore from "@/features/auth/stores/auth-store";

export default function UserDropdown() {
  const user = useAuthStore((s) => s.user);
  const roles = useAuthStore((s) => s.roles);

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

        <DropdownMenuItem>Profil</DropdownMenuItem>

        <DropdownMenuItem>Pengaturan</DropdownMenuItem>

        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
