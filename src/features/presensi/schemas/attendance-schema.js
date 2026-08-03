import { z } from "zod";

export const ATTENDANCE_TYPES = [
  { label: "Sholat", value: "sholat" },
  { label: "Ngaji", value: "ngaji" },
  { label: "Ekstrakurikuler", value: "ekstrakurikuler" },
  { label: "Ngaji Pasan", value: "ngaji_pasan" },
];

export const ATTENDANCE_STATUSES = [
  { label: "Hadir", value: "hadir", color: "green" },
  { label: "Izin", value: "izin", color: "yellow" },
  { label: "Sakit", value: "sakit", color: "blue" },
  { label: "Alfa", value: "alfa", color: "red" },
];

export const attendanceSchema = z.object({
  academic_year_id: z.string().min(1, "Tahun ajaran wajib diisi"),
  class_id: z.string().optional(),
  date: z.string().min(1, "Tanggal wajib diisi"),
  type: z.string().min(1, "Jenis presensi wajib diisi"),
  sub_type: z.string().optional(),
  students: z
    .array(
      z.object({
        student_id: z.string().min(1),
        status: z.enum(["hadir", "izin", "sakit", "alfa"]),
        notes: z.string().optional(),
      }),
    )
    .min(1, "Minimal satu santri harus dipilih"),
});
