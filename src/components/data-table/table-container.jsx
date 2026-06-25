import { cn } from "@/lib/utils";

export default function TableContainer({ children, className }) {
  return (
    <div
      className={cn(
        `
        overflow-hidden
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
