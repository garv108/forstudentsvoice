import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  googleId: text("google_id"),
  institution: text("institution").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries)
  .pick({
    name: true,
    email: true,
    phone: true,
    googleId: true,
    institution: true,
  })
  .extend({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Valid email is required"),
    institution: z.string().trim().min(1, "Institution name is required"),
    phone: z.string().trim().min(1).optional(),
    googleId: z.string().trim().min(1).optional(),
  });

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;