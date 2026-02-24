"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertContactInquirySchema = exports.contactInquiries = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.contactInquiries = (0, pg_core_1.pgTable)("contact_inquiries", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    googleId: (0, pg_core_1.text)("google_id"),
    institution: (0, pg_core_1.text)("institution").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertContactInquirySchema = (0, drizzle_zod_1.createInsertSchema)(exports.contactInquiries)
    .pick({
    name: true,
    email: true,
    phone: true,
    googleId: true,
    institution: true,
})
    .extend({
    name: zod_1.z.string().trim().min(1, "Name is required"),
    email: zod_1.z.string().trim().email("Valid email is required"),
    institution: zod_1.z.string().trim().min(1, "Institution name is required"),
    phone: zod_1.z.string().trim().min(1).optional(),
    googleId: zod_1.z.string().trim().min(1).optional(),
});
