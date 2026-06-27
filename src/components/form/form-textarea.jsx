import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

export default function FormTextarea({
  control,
  name,
  label,
  placeholder,
  rows = 4,
  disabled = false,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Textarea
              {...field}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              className="resize-none rounded-xl"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}