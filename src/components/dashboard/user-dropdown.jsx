import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { dummyUser } from "@/constants/dummy-user";

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="p-3 border-b">
          <h4 className="font-medium">{dummyUser.name}</h4>

          <p className="text-xs text-muted-foreground capitalize">
            {dummyUser.role}
          </p>
        </div>

        <DropdownMenuItem>Profil</DropdownMenuItem>

        <DropdownMenuItem>Pengaturan</DropdownMenuItem>

        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
