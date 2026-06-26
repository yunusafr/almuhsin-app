import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

export default function FormTextarea({ control, name, label, placeholder }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="rounded-2xl"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
