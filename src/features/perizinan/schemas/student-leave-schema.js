import { z } from "zod";

export const studentLeaveSchema = z.object({
  student_id: z.string().min(1, "Santri wajib dipilih"),
  tgl_keluar: z.string().min(1, "Tanggal keluar wajib diisi"),
  jam_keluar: z.string().min(1, "Jam keluar wajib diisi"),
  tgl_kembali: z.string().optional(),
  jam_kembali: z.string().optional(),
  alasan_keluar: z.string().min(1, "Alasan keluar wajib diisi"),
});

export const kembaliSchema = z.object({
  tgl_kembali: z.string().min(1, "Tanggal kembali wajib diisi"),
  jam_kembali: z.string().min(1, "Jam kembali wajib diisi"),
});
