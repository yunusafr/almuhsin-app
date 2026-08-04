import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormWrapper,
  FormSection,
  FormGrid,
  FormSelect,
  FormActions,
} from "@/components/form";

import {
  enrollmentSchema,
  ENROLLMENT_STATUSES,
} from "@/features/enrollment/schemas/enrollment-schema";
import { useStudents } from "@/features/santri/hooks/use-students";
import { useClasses } from "@/features/kelas/hooks/use-classes";
import { useAcademicYears } from "@/features/academic-year/hooks/use-academic-year";
import { useEnrollments } from "@/features/enrollment/hooks/use-enrollments";

const INITIAL_VALUES = {
  student_id: "",
  class_id: "",
  academic_year_id: "",
  status: "aktif",
};

export default function EnrollmentForm({
  data,
  loading,
  onSubmit,
  onCancel,
}) {
  const isEdit = !!data;

  const { data: students = [] } = useStudents();
  const { data: classes = [] } = useClasses();
  const { data: academicYearResponse } = useAcademicYears();
  const academicYears = academicYearResponse?.data ?? [];

  const getValues = (entry) =>
    isEdit
      ? {
          student_id: entry?.student_id ?? "",
          class_id: entry?.class_id ?? "",
          academic_year_id: entry?.academic_year_id ?? "",
          status: entry?.status ?? "aktif",
        }
      : INITIAL_VALUES;

  const form = useForm({
    resolver: zodResolver(enrollmentSchema),
    values: getValues(data),
  });

  const watchedYear = form.watch("academic_year_id");

  // Data plotting pada tahun ajaran terpilih — untuk mencegah duplikat.
  const { data: yearEnrollments } = useEnrollments(
    watchedYear ? { academic_year_id: watchedYear } : {},
  );

  const plottedStudentIds = useMemo(() => {
    return new Set(
      (yearEnrollments?.data ?? []).map((item) => item.student_id),
    );
  }, [yearEnrollments]);

  const studentOptions = useMemo(() => {
    return students.map((student) => ({
      label: `${student.name}${student.nis ? ` (${student.nis})` : ""}`,
      value: student.id,
      // Santri yang sudah diplot pada tahun terpilih tidak bisa
      // dipilih lagi (kecuali santri yang sedang diedit).
      disabled:
        isEdit && student.id === data?.student_id
          ? false
          : plottedStudentIds.has(student.id),
    }));
  }, [students, plottedStudentIds, isEdit, data?.student_id]);

  const classOptions = useMemo(() => {
    return classes.map((klass) => ({
      label: klass.name,
      value: klass.id,
    }));
  }, [classes]);

  const academicYearOptions = useMemo(() => {
    return academicYears.map((year) => ({
      label: year.name,
      value: year.id,
    }));
  }, [academicYears]);

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormSection
        title="Data Plotting"
        description={
          isEdit
            ? "Perbarui penempatan santri (pindah kelas / status)."
            : "Plotting santri ke kelas pada tahun ajaran tertentu."
        }
      >
        <FormGrid>
          <FormSelect
            control={form.control}
            name="student_id"
            label="Santri"
            placeholder="Pilih santri..."
            options={studentOptions}
          />

          <FormSelect
            control={form.control}
            name="class_id"
            label="Kelas"
            placeholder="Pilih kelas..."
            options={classOptions}
          />
        </FormGrid>

        <FormGrid>
          <FormSelect
            control={form.control}
            name="academic_year_id"
            label="Tahun Ajaran"
            placeholder="Pilih tahun ajaran..."
            options={academicYearOptions}
          />

          <FormSelect
            control={form.control}
            name="status"
            label="Status"
            options={ENROLLMENT_STATUSES.map((s) => ({
              label: s.label,
              value: s.value,
            }))}
          />
        </FormGrid>
      </FormSection>

      <FormActions
        loading={loading}
        submitLabel={isEdit ? "Simpan Perubahan" : "Plotting Santri"}
        onCancel={onCancel}
      />
    </FormWrapper>
  );
}
