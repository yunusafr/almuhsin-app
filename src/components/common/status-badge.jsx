import { Badge } from "@/components/ui/badge";

const variants = {
  active: "bg-green-100 text-green-700 border-green-200",

  pending: "bg-amber-100 text-amber-700 border-amber-200",

  danger: "bg-red-100 text-red-700 border-red-200",

  info: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function StatusBadge({ children, variant = "active" }) {
  return (
    <Badge
      className={`
      rounded-full
      px-3
      py-1
      border
      ${variants[variant]}
      `}
    >
      {children}
    </Badge>
  );
}
