import { z } from "zod";

export const createSecurityGuardSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const updateSecurityGuardSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  // Kosongkan password jika tidak ingin mengganti.
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
});
