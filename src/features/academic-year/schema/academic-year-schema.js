import { z } from "zod";

export const academicYearSchema = z.object({
  name: z
    .string()
    .min(1, "Nama tahun pelajaran wajib diisi")
    .regex(
      /^\d{4}\/\d{4}$/,
      "Format harus 2025/2026"
    ),

  is_active: z.boolean(),
});