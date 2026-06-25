import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function DataTableSearch({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={18}
        className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-muted-foreground
      "
      />

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          pl-10
          rounded-2xl
          h-11
        "
      />
    </div>
  );
}
