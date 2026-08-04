import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormWrapper from "@/components/form/form-wrapper";
import FormSection from "@/components/form/form-section";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import FormTextarea from "@/components/form/form-textarea";
import FormDatePicker from "@/components/form/form-date-picker";
import FormActions from "@/components/form/form-actions";

import { santriSchema } from "@/features/santri/schemas/santri-schema";

const INITIAL_VALUES = {
  nis: "",
  name: "",
  birth_place: "",
  birth_date: "",
  address: "",
  guardian_name: "",
  guardian_phone: "",
  tingkat: "",
  rombel: "",
  status: "aktif",
};

const STATUS_OPTIONS = [
  {
    label: "Aktif",
    value: "aktif",
  },
  {
    label: "Lulus",
    value: "lulus",
  },
  {
    label: "Keluar",
    value: "keluar",
  },
  {
    label: "Mutasi",
    value: "mutasi",
  },
];

const TINGKAT_OPTIONS = [
  {
    label: "Tingkat 10",
    value: "10",
  },
  {
    label: "Tingkat 11",
    value: "11",
  },
  {
    label: "Tingkat 12",
    value: "12",
  },
];

const getFormValues = (data) => ({
  ...INITIAL_VALUES,
  ...data,
  tingkat: String(data?.tingkat ?? ""),
  status: String(data?.status ?? "aktif"),
});

export default function SantriForm({
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
}) {
  const form = useForm({
    resolver: zodResolver(santriSchema),
    values: defaultValues ? getFormValues(defaultValues) : INITIAL_VALUES,
  });

  return (
    <FormWrapper
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <FormSection
          title="Identitas Santri"
          description="Data utama santri."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <FormInput
              control={form.control}
              name="nis"
              label="NIS"
              placeholder="202600001"
            />

            <FormInput
              control={form.control}
              name="name"
              label="Nama Lengkap"
              placeholder="Muhammad Abdullah"
            />

            <FormInput
              control={form.control}
              name="birth_place"
              label="Tempat Lahir"
              placeholder="Surabaya"
            />

            <FormDatePicker
              control={form.control}
              name="birth_date"
              label="Tanggal Lahir"
            />

<FormSelect
  control={form.control}
  name="tingkat"
  label="Tingkat"
  options={TINGKAT_OPTIONS}
/>

            <FormInput
              control={form.control}
              name="rombel"
              label="Rombel"
              placeholder="11 TKJ 2"
            />

            <FormSelect
              control={form.control}
              name="status"
              label="Status"
              placeholder="Pilih Status"
              options={STATUS_OPTIONS}
            />
          </div>
        </FormSection>

        <FormSection
          title="Data Wali Santri"
          description="Informasi wali yang dapat dihubungi."
        >
          <div className="grid gap-4">
            <FormInput
              control={form.control}
              name="guardian_name"
              label="Nama Wali"
              placeholder="Suryono"
            />

            <FormInput
              control={form.control}
              name="guardian_phone"
              label="No. HP Wali"
              placeholder="081234567890"
            />
          </div>
        </FormSection>
      </div>

      <FormSection
        title="Alamat"
        description="Alamat tempat tinggal santri."
      >
        <FormTextarea
          control={form.control}
          name="address"
          label="Alamat"
          placeholder="Jl. Menanggal No. 12 Surabaya"
          rows={4}
        />
      </FormSection>

      <FormActions
        loading={loading}
        submitLabel={
          defaultValues
            ? "Simpan Perubahan"
            : "Tambah Santri"
        }
        cancelLabel="Batal"
        onCancel={
          onCancel ??
          (() => form.reset(defaultValues ?? INITIAL_VALUES))
        }
      />
    </FormWrapper>
  );
}