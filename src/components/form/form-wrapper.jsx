import { cn } from "@/lib/utils";

export default function FormWrapper({ children, className, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        `
        rounded-3xl
        border
        bg-card
        shadow-sm
        `,
        className,
      )}
    >
      {children}
    </form>
  );
}
