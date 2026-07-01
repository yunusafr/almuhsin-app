import { cn } from "@/lib/utils";

export default function TableContainer({ children, className }) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        border
        bg-card
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
