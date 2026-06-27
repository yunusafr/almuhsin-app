import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

export default function SantriRowAction({
  santri,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <MoreHorizontal size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />

          Detail
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />

          Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />

          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}