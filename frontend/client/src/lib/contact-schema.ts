import { z } from "zod";

export const insertContactInquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  institution: z.string().trim().min(1, "Institution name is required"),
  phone: z.string().trim().min(1).optional(),
  googleId: z.string().trim().min(1).optional(),
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;