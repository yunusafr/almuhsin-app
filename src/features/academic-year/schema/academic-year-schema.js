import { z } from "zod";

export const academicYearSchema = z.object({
  name: z.string().min(1, "Nama tahun pelajaran wajib diisi").max(30),

  is_active: z.boolean(),
});
