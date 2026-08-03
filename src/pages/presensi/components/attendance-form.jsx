import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import FormWrapper from "@/components/form/form-wrapper";
import FormSection from "@/components/form/form-section";
import FormGrid from "@/components/form/form-grid";
import FormSelect from "@/components/form/form-select";
import FormDatePicker from "@/components/form/form-date-picker";
import FormInput from "@/components/form/form-input";
import FormActions from "@/components/form/form-actions";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/common/status-badge";
import EmptyState from "@/components/common/empty-state";

import { useAcademicYears } from "@/features/academic-year/hooks/use-academic-year";
import { useClasses } from "@/features/kelas/hooks/use-classes";
import { useStudents } from "@/features/santri/hooks/use-students";

import {
  attendanceSchema,
  ATTENDANCE_TYPES,
  ATTENDANCE_STATUSES,
} from "@/features/presensi/schemas/attendance-schema";

import { cn } from "@/lib/utils";

const INITIAL_VALUES = {
  academic_year_id: "",
  class_id: "",
  date: format(new Date(), "yyyy-MM-dd"),
  type: "sholat",
  sub_type: "",
  students: [],
};

const STATUS_STYLES = {
  hadir: "border-green-500 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  izin: "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  sakit: "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  alfa: "border-red-500 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function AttendanceForm({
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
}) {
  const { data: academicYearResponse } = useAcademicYears();
  const { data: classes = [] } = useClasses();
  const { data: students = [] } = useStudents();

  const academicYears = academicYearResponse?.data ?? academicYearResponse ?? [];
  const activeYear = academicYears.find((item) => item.is_active);

  const [studentSearch, setStudentSearch] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");

  const form = useForm({
    resolver: zodResolver(attendanceSchema),
    defaultValues: INITIAL_VALUES,
  });

  const { control, watch, setValue } = form;

  const { replace } = useFieldArray({
    control,
    name: "students",
  });

  const watchedType = watch("type");
  const watchedStudents = watch("students");

  const classId = watch("class_id") ?? selectedClassId;

  useEffect(() => {
    if (selectedClassId !== classId) {
      setSelectedClassId(classId);
    }
  }, [classId, selectedClassId]);

  const filteredStudents = useMemo(() => {
    const keyword = studentSearch.trim().toLowerCase();

    let list = students;

    if (classId) {
      const selectedClass = classes.find((item) => item.id === classId);

      list = list.filter((student) => {
        const matchRombel = student.rombel
          ?.toLowerCase()
          .includes(selectedClass?.name?.toLowerCase() ?? "");
        const matchTingkat =
          selectedClass?.level && student.tingkat === selectedClass.level;

        return matchRombel || matchTingkat;
      });
    }

    if (keyword) {
      list = list.filter(
        (student) =>
          student.name?.toLowerCase().includes(keyword) ||
          student.nis?.toLowerCase().includes(keyword),
      );
    }

    return list;
  }, [students, classId, classes, studentSearch]);

  const selectedStudentIds = useMemo(
    () => new Set((watchedStudents ?? []).map((item) => item.student_id)),
    [watchedStudents],
  );

  useEffect(() => {
    if (!students.length) return;

    // Sinkronkan daftar santri ketika data dimuat / filter kelas berubah.
    const currentIds = new Set(
      (form.getValues("students") ?? []).map((item) => item.student_id),
    );

    const merged = filteredStudents.map((student) => ({
      student_id: student.id,
      status: currentIds.has(student.id)
        ? form
            .getValues("students")
            .find((item) => item.student_id === student.id)?.status ?? "hadir"
        : "hadir",
      notes: currentIds.has(student.id)
        ? form
            .getValues("students")
            .find((item) => item.student_id === student.id)?.notes ?? ""
        : "",
    }));

    replace(merged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredStudents]);

  const counts = useMemo(() => {
    return (watchedStudents ?? []).reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] ?? 0) + 1;
        return acc;
      },
      { hadir: 0, izin: 0, sakit: 0, alfa: 0 },
    );
  }, [watchedStudents]);

  function setStatus(index, status) {
    setValue(`students.${index}.status`, status, { shouldDirty: true });
  }

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormSection
        title="Informasi Presensi"
        description="Atur tahun ajaran, kelas, tanggal dan jenis presensi."
      >
        <FormGrid cols={2}>
          <FormSelect
            control={control}
            name="academic_year_id"
            label="Tahun Ajaran"
            placeholder="Pilih Tahun Ajaran"
            options={academicYears.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            disabled={!!defaultValues}
          />

          <FormSelect
            control={control}
            name="class_id"
            label="Kelas (Opsional)"
            placeholder="Semua Kelas"
            options={classes.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />

          <FormDatePicker
            control={control}
            name="date"
            label="Tanggal"
            disabled={!!defaultValues}
          />

          <FormSelect
            control={control}
            name="type"
            label="Jenis Presensi"
            options={ATTENDANCE_TYPES}
            disabled={!!defaultValues}
          />
        </FormGrid>

        {watchedType === "ekstrakurikuler" && (
          <div className="mt-5">
            <FormInput
              control={control}
              name="sub_type"
              label="Sub Jenis (Opsional)"
              placeholder="Contoh: Pramuka, Marawis, Futsal..."
            />
          </div>
        )}
      </FormSection>

      <FormSection
        title="Daftar Santri"
        description="Tandai status kehadiran setiap santri."
      >
        <div className="mb-4 max-w-sm">
          <Input
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            placeholder="Cari NIS atau nama santri..."
            className="h-10 rounded-xl"
          />
        </div>

        {activeYear && (
          <p className="mb-4 text-xs text-muted-foreground">
            Tahun ajaran aktif:{" "}
            <span className="font-semibold text-foreground">
              {activeYear.name}
            </span>
          </p>
        )}

        {filteredStudents.length === 0 ? (
          <EmptyState
            title="Tidak ada santri"
            description="Tidak ada santri yang cocok dengan filter kelas / pencarian."
          />
        ) : (
          <div className="space-y-2">
            {filteredStudents.map((student, index) => {
              const status = watchedStudents?.[index]?.status ?? "hadir";

              return (
                <div
                  key={student.id}
                  className={cn(
                    "flex flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between",
                    selectedStudentIds.has(student.id)
                      ? "border-green-200 bg-green-50/50 dark:border-green-500/20 dark:bg-green-500/5"
                      : "border-border",
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{student.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {student.nis ?? "-"}
                      {student.rombel ? ` • ${student.rombel}` : ""}
                      {student.tingkat ? ` • Tk. ${student.tingkat}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {ATTENDANCE_STATUSES.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setStatus(index, option.value)}
                        className={cn(
                          "rounded-xl border px-3 py-1.5 text-xs font-semibold transition",
                          status === option.value
                            ? STATUS_STYLES[option.value]
                            : "border-border text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t pt-4">
          <span className="text-sm font-medium">Ringkasan:</span>

          {ATTENDANCE_STATUSES.map((option) => (
            <span key={option.value} className="flex items-center gap-1.5 text-sm">
              <StatusBadge color={option.color}>{option.label}</StatusBadge>

              <span className="font-semibold">{counts[option.value] ?? 0}</span>
            </span>
          ))}

          <span className="ml-auto text-sm text-muted-foreground">
            Total {filteredStudents.length} santri
          </span>
        </div>
      </FormSection>

      <FormActions
        loading={loading}
        submitLabel="Simpan Presensi"
        cancelLabel="Batal"
        onCancel={onCancel ?? (() => form.reset())}
      />
    </FormWrapper>
  );
}
