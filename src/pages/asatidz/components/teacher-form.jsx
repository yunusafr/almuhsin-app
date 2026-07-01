import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormWrapper from "@/components/form/form-wrapper";
import FormSection from "@/components/form/form-section";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import FormTextarea from "@/components/form/form-textarea";
import FormActions from "@/components/form/form-actions";

import {
  createTeacherSchema,
  updateTeacherSchema,
} from "@/features/asatidz/schemas/teacher-schema";

export default function TeacherForm({
  defaultValues,
  loading = false,
  onSubmit,
}) {
  const isEdit = !!defaultValues;

  const form = useForm({
    resolver: zodResolver(isEdit ? updateTeacherSchema : createTeacherSchema),

    defaultValues: {
      name: "",
      email: "",
      gender: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name,
        gender: defaultValues.gender,
        phone: defaultValues.phone,
        address: defaultValues.address,
      });

      return;
    }

    form.reset({
      name: "",
      email: "",
      gender: "",
      phone: "",
      address: "",
    });
  }, [defaultValues, form]);

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormSection
        title="Biodata Asatidz"
        description="Informasi dasar ustadz/ustadzah."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="name"
            label="Nama Lengkap"
            placeholder="Muchammad Ma'sum, M.Pd.I."
          />

          {!isEdit && (
            <FormInput
              control={form.control}
              name="email"
              label="Email Login"
              placeholder="ustadz@almuhsin.app"
            />
          )}

          <FormSelect
            control={form.control}
            name="gender"
            label="Jenis Kelamin"
            placeholder="Pilih Jenis Kelamin"
            options={[
              {
                label: "Laki-laki",
                value: "L",
              },
              {
                label: "Perempuan",
                value: "P",
              },
            ]}
          />

          <FormInput
            control={form.control}
            name="phone"
            label="Nomor HP"
            placeholder="081234567890"
          />
        </div>

        <div className="mt-5">
          <FormTextarea
            control={form.control}
            name="address"
            label="Alamat"
            placeholder="Alamat lengkap"
            rows={4}
          />
        </div>
      </FormSection>

      <FormActions
        loading={loading}
        submitLabel={isEdit ? "Simpan Perubahan" : "Tambah Asatidz"}
        cancelLabel="Batal"
        onCancel={() => form.reset()}
      />
    </FormWrapper>
  );
}
