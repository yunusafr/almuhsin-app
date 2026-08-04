import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "Nama kelas wajib diisi"),

  // level opsional sesuai docs API (misal: "Tingkat 1")
  level: z.string().optional(),
});
