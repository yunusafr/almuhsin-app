import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormWrapper from "@/components/form/form-wrapper";
import FormSection from "@/components/form/form-section";
import FormInput from "@/components/form/form-input";
import FormActions from "@/components/form/form-actions";

import { classSchema } from "@/features/kelas/schemas/class-schema";

export default function ClassForm({
  defaultValues,
  loading = false,
  onSubmit,
}) {
  const form = useForm({
    resolver: zodResolver(classSchema),

    defaultValues: {
      name: "",
      level: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        name: "",
        level: "",
      });
    }
  }, [defaultValues, form]);

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormSection
        title="Master Kelas"
        description="Informasi kelas yang akan digunakan pada sistem."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="name"
            label="Nama Kelas"
            placeholder="VII-A"
          />

          <FormInput
            control={form.control}
            name="level"
            label="Level"
            placeholder="7"
          />
        </div>
      </FormSection>

      <FormActions
        loading={loading}
        submitLabel={defaultValues ? "Simpan Perubahan" : "Tambah Kelas"}
        cancelLabel="Batal"
        onCancel={() => form.reset()}
      />
    </FormWrapper>
  );
}
