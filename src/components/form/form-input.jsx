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
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="h-11 rounded-2xl"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
