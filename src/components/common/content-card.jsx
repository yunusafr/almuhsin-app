import { Card } from "@/components/ui/card";

export default function ContentCard({ children, className = "" }) {
  return (
    <Card
      className={`
      rounded-3xl
      border
      ${className}
    `}
    >
      <div className="p-6">{children}</div>
    </Card>
  );
}
