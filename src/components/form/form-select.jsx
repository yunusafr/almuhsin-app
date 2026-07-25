import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormSelect({
  control,
  name,
  label,
  placeholder = "Pilih...",
  options = [],
  disabled = false,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}

            <Select
              disabled={disabled}
              value={String(field.value ?? "")}
              onValueChange={(value) => field.onChange(value)}
            >
              <FormControl>
                <SelectTrigger className="h-11 w-full rounded-xl">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}