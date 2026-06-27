import { Form } from "@/components/ui/form";

export default function FormWrapper({
  form,
  onSubmit,
  children,
  className = "",
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={`space-y-6 ${className}`}
      >
        {children}
      </form>
    </Form>
  );
}