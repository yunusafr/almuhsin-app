import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

export default function FormInput({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className="h-11 rounded-xl"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}