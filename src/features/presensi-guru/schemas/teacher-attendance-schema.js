import { z } from "zod";

export const TEACHER_ATTENDANCE_STATUSES = [
  { label: "Hadir", value: "hadir", color: "green" },
  { label: "Izin", value: "izin", color: "yellow" },
  { label: "Sakit", value: "sakit", color: "blue" },
  { label: "Alfa", value: "alfa", color: "red" },
];

export const teacherAttendanceSchema = z.object({
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  jam: z.string().min(1, "Jam wajib diisi"),
  teacher_id: z.string().min(1, "Guru wajib dipilih"),
  kelas_diisi: z.string().optional(),
  keterangan: z.string().min(1, "Keterangan wajib diisi"),
  keterangan_tambahan: z.string().optional(),
});

export const teacherAttendanceEditSchema = z.object({
  keterangan: z.string().min(1, "Keterangan wajib diisi"),
  keterangan_tambahan: z.string().optional(),
});
