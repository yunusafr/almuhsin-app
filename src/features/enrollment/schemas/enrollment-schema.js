import { z } from "zod";

export const ENROLLMENT_STATUSES = [
  { label: "Aktif", value: "aktif", color: "green" },
  { label: "Mutasi", value: "mutasi", color: "yellow" },
  { label: "Lulus", value: "lulus", color: "blue" },
  { label: "Keluar", value: "keluar", color: "red" },
];

export const enrollmentSchema = z.object({
  student_id: z.string().min(1, "Santri wajib dipilih"),
  class_id: z.string().min(1, "Kelas wajib dipilih"),
  academic_year_id: z.string().min(1, "Tahun ajaran wajib dipilih"),
  status: z.string().min(1, "Status wajib dipilih"),
});

export const enrollmentBulkSchema = z.object({
  class_id: z.string().min(1, "Kelas wajib dipilih"),
  academic_year_id: z.string().min(1, "Tahun ajaran wajib dipilih"),
  student_ids: z.array(z.string()).min(1, "Pilih minimal satu santri"),
  status: z.string().min(1, "Status wajib dipilih"),
});
