import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
}) {
  return (
    <div className="relative w-full max-w-sm">
      <Search size={18} className="absolute left-3 top-3 text-slate-400" />

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
}
