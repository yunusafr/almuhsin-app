import { Badge } from "@/components/ui/badge";

export default function StatusBadge({ status }) {
  const variants = {
    aktif: "bg-green-100 text-green-700",
    nonaktif: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    lunas: "bg-green-100 text-green-700",
    sebagian: "bg-orange-100 text-orange-700",
  };

  return (
    <Badge className={variants[status?.toLowerCase()] || ""}>{status}</Badge>
  );
}
