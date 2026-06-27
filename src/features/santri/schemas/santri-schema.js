import { z } from "zod";

export const santriSchema = z.object({
  nis: z.string().min(1, "NIS wajib diisi"),

  name: z.string().min(3, "Nama wajib diisi"),

  birth_place: z.string().min(1, "Tempat lahir wajib diisi"),

  birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),

  address: z.string().min(1, "Alamat wajib diisi"),

  guardian_name: z.string().min(1, "Nama wali wajib diisi"),

  guardian_phone: z.string().min(1, "No HP wajib diisi"),

  rombel: z.string().min(1),

  status: z.enum([
    "aktif",
    "keluar",
    "lulus",
    "mutasi",
  ]),
});