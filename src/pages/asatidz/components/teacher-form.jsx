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
  onCancel,
}) {
  const isEdit = !!defaultValues;

  const getValues = (data) => ({
    name: data?.name ?? "",
    email: data?.email ?? "",
    gender: data?.gender ?? "",
    phone: data?.phone ?? "",
    address: data?.address ?? "",
    password: "",
  });

  const form = useForm({
    resolver: zodResolver(isEdit ? updateTeacherSchema : createTeacherSchema),

    values: defaultValues ? getValues(defaultValues) : getValues(),
  });

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

      <FormSection
        title="Akun Login"
        description={
          isEdit
            ? "Kosongkan password jika tidak ingin menggantinya."
            : "Kredensial login untuk akun asatidz."
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          {!isEdit && (
            <FormInput
              control={form.control}
              name="email"
              label="Email Login"
              placeholder="ustadz@almuhsin.app"
            />
          )}

          <FormInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder={
              isEdit
                ? "Kosongkan jika tidak diganti"
                : "Minimal 8 karakter"
            }
          />
        </div>
      </FormSection>

      <FormActions
        loading={loading}
        submitLabel={isEdit ? "Simpan Perubahan" : "Tambah Asatidz"}
        cancelLabel="Batal"
        onCancel={onCancel ?? (() => form.reset())}
      />
    </FormWrapper>
  );
}
