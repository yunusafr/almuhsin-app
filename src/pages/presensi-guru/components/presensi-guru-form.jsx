import { useEffect, useMemo } from "react";
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

import {
  teacherAttendanceSchema,
  teacherAttendanceEditSchema,
  TEACHER_ATTENDANCE_STATUSES,
} from "@/features/presensi-guru/schemas/teacher-attendance-schema";
import { useTeachers } from "@/features/asatidz/hooks/use-teachers";

const INITIAL_VALUES = {
  tanggal: format(new Date(), "yyyy-MM-dd"),
  jam: "07:00",
  teacher_id: "",
  kelas_diisi: "",
  keterangan: "",
  keterangan_tambahan: "",
};

export default function PresensiGuruForm({
  data,
  loading,
  onSubmit,
  onCancel,
}) {
  const isEdit = !!data;

  const { data: teachers = [] } = useTeachers();

  const teacherOptions = useMemo(() => {
    return teachers.map((teacher) => ({
      label: teacher.name,
      value: teacher.id,
    }));
  }, [teachers]);

  const form = useForm({
    resolver: zodResolver(
      isEdit ? teacherAttendanceEditSchema : teacherAttendanceSchema,
    ),
    defaultValues: isEdit
      ? {
          keterangan: data.keterangan ?? "",
          keterangan_tambahan: data.keterangan_tambahan ?? "",
        }
      : INITIAL_VALUES,
  });

  useEffect(() => {
    if (isEdit) {
      form.reset({
        keterangan: data.keterangan ?? "",
        keterangan_tambahan: data.keterangan_tambahan ?? "",
      });
    } else {
      form.reset(INITIAL_VALUES);
    }
  }, [data, isEdit, form]);

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      {isEdit ? (
        <FormSection title="Perbarui Keterangan">
          <FormGrid>
            <FormSelect
              control={form.control}
              name="keterangan"
              label="Keterangan"
              placeholder="Pilih keterangan..."
              options={TEACHER_ATTENDANCE_STATUSES.map((s) => ({
                label: s.label,
                value: s.value,
              }))}
            />

            <FormInput
              control={form.control}
              name="keterangan_tambahan"
              label="Keterangan Tambahan"
              placeholder="Opsional"
            />
            </FormGrid>
            </FormSection>
            ) : (
            <>
            <FormSection title="Data Presensi">
            <FormGrid>
              <FormDatePicker
                control={form.control}
                name="tanggal"
                label="Tanggal"
              />

              <FormInput
                control={form.control}
                name="jam"
                label="Jam"
                type="time"
              />
            </FormGrid>

            <FormGrid>
              <FormSelect
                control={form.control}
                name="teacher_id"
                label="Guru"
                placeholder="Pilih guru..."
                options={teacherOptions}
              />

              <FormInput
                control={form.control}
                name="kelas_diisi"
                label="Kelas Diisi"
                placeholder="Misal: 10 TPM 1 (opsional)"
              />
            </FormGrid>
            </FormSection>

            <FormSection title="Keterangan Kehadiran">
            <FormGrid>
              <FormSelect
                control={form.control}
                name="keterangan"
                label="Keterangan"
                placeholder="Pilih keterangan..."
                options={TEACHER_ATTENDANCE_STATUSES.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />

              <FormTextarea
                control={form.control}
                name="keterangan_tambahan"
                label="Keterangan Tambahan"
                placeholder="Opsional"
              />
            </FormGrid>
            </FormSection>
            </>
            )}

      <FormActions
        loading={loading}
        submitLabel={isEdit ? "Simpan Perubahan" : "Simpan Presensi"}
        onCancel={onCancel}
      />
    </FormWrapper>
  );
}
