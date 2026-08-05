import { z } from "zod";

export const PHONE_COLLECTION_STATUSES = [
  { label: "Dikumpulkan", value: "dikumpulkan", color: "yellow" },
  { label: "Disita", value: "disita", color: "red" },
  { label: "Dikembalikan", value: "dikembalikan", color: "green" },
];

export const phoneCollectionBulkSchema = z.object({
  phone_name: z.string().min(1, "Nama HP wajib diisi"),
  status: z.string().min(1, "Status wajib dipilih"),
  notes: z.string().optional(),
  student_ids: z.array(z.string()).min(1, "Pilih minimal satu santri"),
});

export const phoneCollectionReturnSchema = z.object({
  status: z.literal("dikembalikan"),
  notes: z.string().optional(),
});
