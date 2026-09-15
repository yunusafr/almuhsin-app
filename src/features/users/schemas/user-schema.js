import { z } from "zod";

const ROLES = ["Super Admin", "Ustadz", "Bendahara", "Keamanan"];

export { ROLES };

export const createUserSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.string().min(1, "Role wajib dipilih"),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .or(z.literal("")),
  role: z.string().min(1, "Role wajib dipilih"),
});
