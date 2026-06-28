import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormWrapper,
  FormSection,
  FormGrid,
  FormInput,
  FormSwitch,
  FormActions,
} from "@/components/form";

import { academicYearSchema } from "@/features/academic-year/schema/academic-year-schema";

export default function AcademicYearForm({
  defaultValues,
  loading = false,
  onSubmit,
}) {
  const form = useForm({
    resolver: zodResolver(academicYearSchema),
    defaultValues: {
      name: "",
      is_active: false,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name,
        is_active: defaultValues.is_active,
      });
    } else {
      form.reset({
        name: "",
        is_active: false,
      });
    }
  }, [defaultValues, form]);

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormSection
        title="Informasi Tahun Pelajaran"
        description="Masukkan informasi tahun pelajaran."
      >
        <FormGrid cols={1}>
          <FormInput
            control={form.control}
            name="name"
            label="Nama Tahun Pelajaran"
            placeholder="Contoh : 2026/2027"
          />

          <FormSwitch
            control={form.control}
            name="is_active"
            label="Jadikan Tahun Aktif"
            description="Jika diaktifkan maka tahun pelajaran lain otomatis menjadi tidak aktif."
          />
        </FormGrid>
      </FormSection>

      <FormActions
        loading={loading}
        submitLabel={defaultValues ? "Simpan Perubahan" : "Simpan"}
      />
    </FormWrapper>
  );
}
