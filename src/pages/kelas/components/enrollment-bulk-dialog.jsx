import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  FormWrapper,
  FormSection,
  FormGrid,
  FormSelect,
  FormActions,
} from "@/components/form";

import {
  enrollmentBulkSchema,
  ENROLLMENT_STATUSES,
} from "@/features/enrollment/schemas/enrollment-schema";
import { useStudents } from "@/features/santri/hooks/use-students";
import { useClasses } from "@/features/kelas/hooks/use-classes";
import { useAcademicYears } from "@/features/academic-year/hooks/use-academic-year";
import { useCreateBulkEnrollment, useEnrollments } from "@/features/enrollment/hooks/use-enrollments";

const INITIAL_VALUES = {
  class_id: "",
  academic_year_id: "",
  status: "aktif",
  student_ids: [],
};

export default function EnrollmentBulkDialog({ open, onOpenChange }) {
  const [studentKeyword, setStudentKeyword] = useState("");

  const createMutation = useCreateBulkEnrollment();

  const { data: students = [] } = useStudents();
  const { data: classes = [] } = useClasses();
  const { data: academicYearResponse } = useAcademicYears();
  const academicYears = academicYearResponse?.data ?? [];

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

  const filteredStudents = useMemo(() => {
    const keyword = studentKeyword.toLowerCase();

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(keyword) ||
        (student.nis ?? "").toLowerCase().includes(keyword),
    );
  }, [students, studentKeyword]);

  const form = useForm({
    resolver: zodResolver(enrollmentBulkSchema),
    defaultValues: INITIAL_VALUES,
  });

  const selectedIds = form.watch("student_ids") ?? [];
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

  useEffect(() => {
    if (open) {
      form.reset(INITIAL_VALUES);
      setStudentKeyword("");
    }
  }, [open, form]);

  function toggleStudent(id) {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];

    form.setValue("student_ids", next, { shouldValidate: true });
  }

  const handleSubmit = async (values) => {
    try {
      const result = await createMutation.mutateAsync({
        class_id: values.class_id,
        academic_year_id: values.academic_year_id,
        student_ids: values.student_ids,
        status: values.status,
      });

      // Respons bulk: {total_requested, total_inserted, total_skipped,
      // skipped_student_ids} — santri yang sudah diplot di tahun ajaran
      // sama otomatis dilewati backend.
      const skipped = result?.data?.total_skipped ?? 0;

      if (skipped > 0) {
        toast.success(
          `${values.student_ids.length} santri diproses, ${skipped} dilewati (sudah diplot di tahun ajaran ini)`,
        );
      } else {
        toast.success(
          `${values.student_ids.length} santri berhasil diploting ke kelas`,
        );
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Gagal melakukan plotting massal.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Plotting Massal Santri</DialogTitle>

          <DialogDescription>
            Plotting banyak santri sekaligus ke satu kelas pada tahun
            ajaran tertentu.
          </DialogDescription>
        </DialogHeader>

        <FormWrapper form={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <FormSection title="Kelas & Tahun Ajaran">
            <FormGrid>
              <FormSelect
                control={form.control}
                name="class_id"
                label="Kelas Pondok"
                placeholder="Pilih kelas pondok..."
                options={classOptions}
              />

              <FormSelect
                control={form.control}
                name="academic_year_id"
                label="Tahun Ajaran"
                placeholder="Pilih tahun ajaran..."
                options={academicYearOptions}
              />
            </FormGrid>
          </FormSection>

          <FormSection title="Pilih Santri">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={studentKeyword}
                onChange={(e) => setStudentKeyword(e.target.value)}
                placeholder="Cari santri..."
                className="h-10 rounded-xl pl-9"
              />
            </div>

            <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border p-2">
              {filteredStudents.length === 0 ? (
                <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                  Tidak ada santri.
                </p>
              ) : (
                filteredStudents.map((student) => {
                  const checked = selectedIds.includes(student.id);
                  const plotted = plottedStudentIds.has(student.id);

                  return (
                    <label
                      key={student.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-muted/60 ${
                        plotted ? "cursor-not-allowed opacity-60" : ""
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        disabled={plotted}
                        onCheckedChange={() => toggleStudent(student.id)}
                      />

                      <span className="text-sm font-medium">
                        {student.name}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {student.rombel ? `${student.rombel} · ` : ""}
                        {student.nis ?? ""}
                      </span>

                      {plotted && (
                        <span className="ml-auto rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-medium text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
                          Sudah diplot
                        </span>
                      )}
                    </label>
                  );
                })
              )}
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {selectedIds.length} santri dipilih
            </p>
          </FormSection>

          <FormGrid>
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

          <FormActions
            loading={createMutation.isPending}
            submitLabel="Plotting Massal"
            onCancel={() => onOpenChange(false)}
          />
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
