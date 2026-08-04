import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import {
  FormWrapper,
  FormSection,
  FormGrid,
  FormInput,
  FormSelect,
  FormTextarea,
  FormDatePicker,
  FormActions,
} from "@/components/form";

import { studentLeaveSchema } from "@/features/perizinan/schemas/student-leave-schema";
import { useStudents } from "@/features/santri/hooks/use-students";

const INITIAL_VALUES = {
  student_id: "",
  tgl_keluar: format(new Date(), "yyyy-MM-dd"),
  jam_keluar: "08:00",
  tgl_kembali: "",
  jam_kembali: "",
  alasan_keluar: "",
};

export default function PerizinanForm({
  defaultValues,
  loading,
  onSubmit,
  onCancel,
}) {
  const { data: students = [] } = useStudents();

  const studentOptions = useMemo(() => {
    return students.map((student) => ({
      label: `${student.name}${student.nis ? ` (${student.nis})` : ""}`,
      value: student.id,
    }));
  }, [students]);

  const form = useForm({
    resolver: zodResolver(studentLeaveSchema),
    defaultValues: defaultValues ?? INITIAL_VALUES,
  });

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormSection title="Data Izin">
        <FormGrid>
          <FormSelect
            control={form.control}
            name="student_id"
            label="Santri"
            placeholder="Pilih santri..."
            options={studentOptions}
          />

          <FormTextarea
            control={form.control}
            name="alasan_keluar"
            label="Alasan Keluar"
            placeholder="Misal: Izin keluarga"
          />
        </FormGrid>

        <FormGrid>
          <FormDatePicker
            control={form.control}
            name="tgl_keluar"
            label="Tanggal Keluar"
          />

          <FormInput
            control={form.control}
            name="jam_keluar"
            label="Jam Keluar"
            type="time"
          />
        </FormGrid>
      </FormSection>

      <FormSection title="Jadwal Kembali (Opsional)">
        <FormGrid>
          <FormDatePicker
            control={form.control}
            name="tgl_kembali"
            label="Tanggal Kembali"
            placeholder="Belum diketahui"
          />

          <FormInput
            control={form.control}
            name="jam_kembali"
            label="Jam Kembali"
            type="time"
          />
        </FormGrid>
      </FormSection>

      <FormActions
        loading={loading}
        submitLabel="Simpan Izin"
        onCancel={onCancel}
      />
    </FormWrapper>
  );
}
