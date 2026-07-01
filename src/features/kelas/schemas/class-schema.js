import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "Nama kelas wajib diisi"),

  level: z.string().min(1, "Level wajib diisi"),
});
