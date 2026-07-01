import { z } from "zod";

const baseSchema = {
  name: z.string().min(1, "Nama wajib diisi"),

  gender: z.string().min(1, "Jenis kelamin wajib dipilih"),

  phone: z.string().min(8, "Nomor HP tidak valid"),

  address: z.string().min(1, "Alamat wajib diisi"),
};

export const createTeacherSchema = z.object({
  ...baseSchema,

  email: z.email("Email tidak valid"),
});

export const updateTeacherSchema = z.object(baseSchema);
