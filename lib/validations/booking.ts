import { z } from "zod";

export const bookingSchema = z.object({
  clientName: z.string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama terlalu panjang"),
  clientEmail: z.string()
    .email("Format email tidak valid"),
  clientPhone: z.string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(20, "Nomor telepon terlalu panjang"),
  projectDetails: z.string()
    .min(10, "Mohon berikan deskripsi project yang agak detail (minimal 10 karakter)")
    .max(1000, "Deskripsi terlalu panjang"),
  projectRepo: z.string()
    .url("Format URL repository tidak valid")
    .optional()
    .or(z.literal("")),
  bookingDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal tidak valid (YYYY-MM-DD)"),
  bookingTime: z.string()
    .min(5, "Format waktu tidak valid"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
